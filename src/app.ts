import express, {Express} from "express";
import { Server } from 'http';
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";

export class App {

    app: Express;
    port: number;
    host: string;
    server: Server;
    logger: LoggerService;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(port: number, host: string, logger: LoggerService, userController: UserController, exceptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = port;
        this.host = host;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
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

