import {App} from "./app";
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./users/users.controller";
import {ExceptionFilter} from "./errors/exception.filter";
import {Container, ContainerModule, interfaces} from "inversify";
import {TYPES} from "./types";
import {ILogger} from "./logger/logger.service.interface";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {IUserController} from "./users/users.controller.interface";
import {IUserService} from "./users/user.service.interface";
import {UserService} from "./users/user.service";
import {IConfigService} from "./config/config.service.interface";
import {ConfigService} from "./config/config.service";
import {PrismaService} from "./database/prisma.service";
import {IUsersRepository} from "./users/users.repository.interface";
import {UsersRepository} from "./users/users.repository";




// логически объединяем биндинги
// Можем потом загружать несколько контейнер-модулей в контейнер
//
export const appBindings = new ContainerModule( (bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
    bind<IUserController>(TYPES.UserController).to(UserController).inSingletonScope();
    bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
    bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    bind<App>(TYPES.Application).to(App);
 } )

function bootstrap() {

    // В контейнер складываем биндинги символов типов на конкретные реализации,
    // а потом будем переиспользовать
    const appContainer = new Container();
    appContainer.load(appBindings);

    // получаем instance app
    const app = appContainer.get<App>(TYPES.Application);
    app.init(8000, "127.0.0.1");



    return { appContainer, app }

}

export const { app, appContainer } = bootstrap();