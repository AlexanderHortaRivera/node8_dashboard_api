import express, {Express} from "express";
import {userRouter} from "./users/users";
import { Server } from 'http';

export class App {

    app: Express;
    port: number;
    host: string;
    server: Server;

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.host = "127.0.0.1";
    }

    useRoutes() {
        this.app.use('/users', userRouter);
    }

    public async init(){
        this.useRoutes();
        this.server = this.app.listen(this.port, this.host);
        console.log(`Сервер запущен на ${this.host}:${this.port}`);
    }

}

