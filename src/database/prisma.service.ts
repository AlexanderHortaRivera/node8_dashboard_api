import {inject, injectable} from "inversify";
import {PrismaClient, UserModel} from "@prisma/client";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.service.interface";

@injectable()
export class PrismaService {
    
    client: PrismaClient;

    constructor(@inject(TYPES.ILogger) private logger: ILogger) {
        this.client = new PrismaClient();
    }

    async connect(): Promise<void> {
        try {
            await this.client.$connect();
            this.logger.log('[PrismaService] Успешно подключились к базе данных');
        }
        catch(e) {
            if(e instanceof Error) {
                this.logger.error(`[PrismaService] Ошибка подключения к базе данных: ${e.message}`);
            }
        }
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }

    
}