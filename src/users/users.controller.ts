import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";


export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);

        this.bindRoutes([
            { path: "/login", func: this.login, method: 'get' },
            { path: "/register", func: this.register, method: 'get' }
        ]);

    }

    login(req: Request, res: Response, next: NextFunction) {
        // this.logger.log("login")
        //this.ok(res, "login");
        next(new HTTPError(401, "Ошибка авторизации", "login"));
    }

    register(req: Request, res: Response, next: NextFunction) {
        // this.logger.log("register")
        this.ok(res, "register");
    }





}