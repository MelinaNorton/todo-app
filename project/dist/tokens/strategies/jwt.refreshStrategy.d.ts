import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens.service';
declare const JwtRefreshStrategy_base: new (...args: unknown[] | [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly tokensService;
    constructor(config: ConfigService, tokensService: TokensService);
    validate(payload: any): Promise<{
        jti: any;
        sub: any;
        username: any;
    }>;
}
export {};
