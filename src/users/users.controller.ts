import {BaseController} from "../common/base.controller";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.service.interface";
import 'reflect-metadata';
import {IUserController} from "./users.controller.interface";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {ValidateMiddleware} from "../common/validate.middleware";
import {sign} from 'jsonwebtoken';
import {IConfigService} from "../config/config.service.interface";
import {AuthMiddleware} from "../common/auth.middleware";
import {AuthGuard} from "../common/auth.guard";

@injectable()
export class UserController extends BaseController implements IUserController{

    constructor(
        @inject(TYPES.ILogger) loggerService: ILogger,
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.ConfigService) private configService: IConfigService
        ) {

        super(loggerService);

        this.bindRoutes([
            {
                controller: "users",
                path: "/login",
                func: this.login,
                method: 'get' ,
                middlewares: [ new  ValidateMiddleware(UserLoginDto)]
            },
            {
                controller: "users",
                path: "/register",
                func: this.register,
                method: 'get',
                middlewares: [ new  ValidateMiddleware(UserRegisterDto)]
            },
            {
                controller: "users",
                path: "/info",
                func: this.info,
                method: 'get',
                middlewares: [new AuthGuard()]
            },
            {
                controller: "users",
                path: "/*",
                func: this.other,
                method: 'get',
                middlewares: [new AuthGuard()]
            }
        ]);

    }

    async login({body}: Request<{},{}, UserLoginDto>, res: Response, next: NextFunction) {

        const result = await this.userService.validateUser(body);
        if(!result) {
            return next( new HTTPError(401, "Неверно указан пользователь или пароль", 'login'));
        }
        const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));

        this.ok(res, {jwt});
    }

    async register(
        { body }: Request<{},{}, UserRegisterDto>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const result = await this.userService.createUser(body);
        if(!result) {
            return next( new HTTPError(422, "Такой пользователь уже существует", 'register'))
        }
        this.ok(res, {email: result.email, id: result.id});
    }

    async info(
        { user }: Request<{},{}, UserRegisterDto>,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userInfo = await this.userService.getUserInfo(user);
        this.ok(res, {email: user, info: userInfo});
    }

    other(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "Ошибка авторизации", "login"));
    }

    private signJWT(email: string, secret: string): Promise<string> {
        return new Promise<string>( ((resolve, reject) => {
            sign(
                {
                    email,
                    iat: Math.floor(Date.now() / 1000)
                },
                secret,
                {
                    algorithm: "HS256"
                },
                (err, token)=> {
                    if(err){
                        reject(err);
                    }
                    resolve(token as string);
                }
            );
        }));
    }



}