import {User} from "./user.entity";
import {UserRegisterDto} from "./dto/user-register.dto";
import {UserLoginDto} from "./dto/user-login.dto";

export interface IUserService {
    createUser: (dto: UserRegisterDto) => User | null;
    validateUser: (dto: UserLoginDto) => boolean;
}