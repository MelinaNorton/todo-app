import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokensService } from '../tokens.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly tokensService;
    constructor(config: ConfigService, tokensService: TokensService);
    validate(payload: any): Promise<{
        jti: any;
        sub: any;
        username: any;
    }>;
}
export {};
