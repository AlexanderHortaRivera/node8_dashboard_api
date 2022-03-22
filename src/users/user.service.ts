import {IUserService} from "./user.service.interface";
import {UserRegisterDto} from "./dto/user-register.dto";
import {User} from "./user.entity";
import {UserLoginDto} from "./dto/user-login.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {IConfigService} from "../config/config.service.interface";
import {ILogger} from "../logger/logger.service.interface";

@injectable()
export class UserService implements IUserService {

    constructor(
        @inject(TYPES.ConfigService) private configService: IConfigService,
        @inject(TYPES.ILogger) private logger: ILogger
        ) {}


    async createUser( { email, name, password }: UserRegisterDto ): Promise<User | null> {
        const newUser = new User(email, name);
        const salt = this.configService.get('SALT');
        this.logger.log(`[SALT] ${salt}`);

        await newUser.setPassword(password, Number(salt));

        // проверка что он есть?
        // Если есть - возвращаем null
        // если нет - создаем

        return null;
    }

    async validateUser( dto: UserLoginDto): Promise<boolean> {
        return true;
    }

}