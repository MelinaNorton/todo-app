import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { UserService } from 'src/users/user.service';
import { TokensService } from 'src/tokens/tokens.service';
import { BcryptService } from './providers/bcrypt.service';
import { User } from 'src/users/interface/user.interface';
import { Response, Request } from 'express';
export declare class AuthService {
    private tokensService;
    private bcryptService;
    private userService;
    constructor(tokensService: TokensService, bcryptService: BcryptService, userService: UserService);
    signup(createAuthDto: Signup): Promise<User>;
    validate(loginAuthDto: Login): Promise<User>;
    login(loginAuthoDto: Login, res: Response, req: Request): Promise<{
        token: string;
        accesstoken: string;
    }>;
}
