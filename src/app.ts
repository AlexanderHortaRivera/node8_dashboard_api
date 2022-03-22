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
import {IUserController} from "./users/users.controller.interface";
import { json } from 'body-parser'
import {IConfigService} from "./config/config.service.interface";

@injectable()
export class App {

    app: Express;
    port: number;
    host: string;
    server: Server;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: IUserController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
        @inject(TYPES.ConfigService) private configService: IConfigService
    ) {
        this.app = express();

    }

    useMiddleware(): void {
        this.app.use(json());
    }

    useRoutes(): void {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters(): void {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init(port: number, host: string): Promise<void> {
        this.port = port;
        this.host = host;
        this.useMiddleware();
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, this.host);
        this.logger.log(`Сервер запущен на ${this.host}:${this.port}`);
    }

}

