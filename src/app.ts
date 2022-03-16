import express, {Express} from "express";
import { Server } from 'http';
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {inject, injectable} from "inversify";
import {TYPES} from "./types";
import {ILogger} from "./logger/logger.service.interface";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import 'reflect-metadata';
import {IUsersController} from "./users/users.controller.interface";

@injectable()
export class App {

    app: Express;
    port: number;
    host: string;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: IUsersController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.host = "127.0.0.1";
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init(){
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, this.host);
        this.logger.log(`Сервер запущен на ${this.host}:${this.port}`);
    }

}

