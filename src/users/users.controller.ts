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

@injectable()
export class UserController extends BaseController implements IUserController{

    constructor(@inject(TYPES.ILogger) loggerService: ILogger) {

        super(loggerService);

        this.bindRoutes([
            { controller: "users", path: "/login", func: this.login, method: 'get' },
            { controller: "users", path: "/register", func: this.register, method: 'get' },
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
        const newUser = new User(body.email, body.name);
        await newUser.setPassword(body.password);
        this.ok(res, newUser);
    }

    other(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "Ошибка авторизации", "login"));
    }




}