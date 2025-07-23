import { TokensService } from './tokens.service';
import { Response } from 'express';
import { User } from 'src/users/interface/user.interface';
import { JwtService } from '@nestjs/jwt';
export declare class TokensController {
    private readonly tokensService;
    private jwtService;
    constructor(tokensService: TokensService, jwtService: JwtService);
    createAndAttachRefreshToken(user: User, res: Response): Promise<string>;
    createAccessToken({ sub, username }: {
        sub: string;
        username: string;
    }): Promise<string>;
    refreshAccessToken(req: any, res: Response): Promise<string>;
}
