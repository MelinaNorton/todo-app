export declare class BcryptService {
    private readonly rounds;
    constructor();
    hashPass(password: string): Promise<string>;
    comparePasswords(password: string, checkPassword: string): Promise<boolean>;
}
