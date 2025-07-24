import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly tokensService;
    constructor(authService: AuthService, tokensService: TokensService);
    signup(createAuthDto: Signup): Promise<void>;
    login(loginAuthDto: Login, res: Response, req: Request): Promise<string>;
    logout(res: Response): Promise<void>;
}
