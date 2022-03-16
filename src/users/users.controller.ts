import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.service.interface";
import 'reflect-metadata';
import {IUsersController} from "./users.controller.interface";

@injectable()
export class UserController extends BaseController implements IUsersController{

    constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
        super(loggerService);

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