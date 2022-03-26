import {IMiddleware} from "./middleware.interface";
import {NextFunction, Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";

export class AuthMiddleware implements IMiddleware {

    constructor(private secret: string) {}

    execute(req: Request, res: Response, next: NextFunction): void {
        // если есть header с авторизацией, то берем токен из него
        // Bearer jwt
        if(req.headers.authorization) {
            const jwt = req.headers.authorization.split(' ')[1];
            verify(jwt, this.secret, (err, payload) => {
                if(err) {
                    next();
                }
                else if(payload){
                    req.user = (payload as JwtPayload).email as string;
                    next();
                }
            });
        } else {
            next();
        }
    }
}