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

@injectable()
export class UserController extends BaseController implements IUserController{

    constructor(
        @inject(TYPES.ILogger) loggerService: ILogger,
        @inject(TYPES.UserService) private userService: UserService
        ) {

        super(loggerService);

        this.bindRoutes([
            { controller: "users", path: "/login", func: this.login, method: 'get' },
            { controller: "users", path: "/register", func: this.register, method: 'get',  middlewares: [ new  ValidateMiddleware(UserRegisterDto)]},
            { controller: "users", path: "/*", func: this.other, method: 'get'}
        ]);

    }

    login(req: Request<{},{}, UserLoginDto>, res: Response, next: NextFunction) {
        console.log(req.body);
        this.ok(res, "login");
    }

    async register(
        { body }: Request<{},{}, UserRegisterDto>,
        res: Response,
        next: NextFunction
    ): Promise<void> {

        const result = await this.userService.createUser(body);
        if(!result) {
            return next( new HTTPError(422, "Такой пользователь уже существует") )
        }
        this.ok(res, result);
    }

    other(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "Ошибка авторизации", "login"));
    }




}