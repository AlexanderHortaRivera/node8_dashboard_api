import express, {Express} from "express";
import { Server } from 'http';
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/users.controller";

export class App {

    app: Express;
    port: number;
    host: string;
    server: Server;
    logger: LoggerService;
    userController: UserController;

    constructor(port: number, host: string, logger: LoggerService, userController: UserController) {
        this.app = express();
        this.port = port;
        this.host = host;
        this.logger = logger;
        this.userController = userController;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    public async init(){
        this.useRoutes();
        this.server = this.app.listen(this.port, this.host);
        this.logger.log(`Сервер запущен на ${this.host}:${this.port}`);
    }

}

