import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/interface/user.interface";
import { Response } from 'express';
import { Model } from "mongoose";
import { CreateTokenDto } from "./dto/create-token.dto";
import { Token } from "./interface/tokens.interface";
export declare class TokensService {
    private jwtService;
    private configService;
    private readonly tokensModel;
    private readonly refreshtokenname;
    private readonly refreshsecret;
    private readonly refreshexpiry;
    private readonly accesstokenname;
    private readonly accesssecret;
    private readonly accessexpiry;
    constructor(jwtService: JwtService, configService: ConfigService, tokensModel: Model<Token>);
    create(createTokenDto: CreateTokenDto): Promise<Token>;
    createToken(user: User): Promise<string>;
    createAccessToken({ sub, username }: {
        sub: string;
        username: string;
    }): Promise<string>;
    attatchToken(token: string, res: Response): Promise<boolean>;
    detatchToken(res: Response): Promise<boolean>;
    validateRefreshToken(token: string): Promise<string>;
    validateAccessToken(token: string): Promise<string>;
    revokeRefreshToken(jti: string): Promise<string>;
    findOne(jti: string): Promise<boolean>;
}
