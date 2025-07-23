"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptService = void 0;
const bcrypt = require("bcrypt");
require('bcrypt');
class BcryptService {
    rounds = 10;
    constructor() {
    }
    async hashPass(password) {
        const salt = await bcrypt.genSalt(this.rounds);
        const securepass = await bcrypt.hash(password, salt);
        return securepass;
    }
    async comparePasswords(password, checkPassword) {
        return bcrypt.compare(password, checkPassword);
    }
}
exports.BcryptService = BcryptService;
//# sourceMappingURL=bcrypt.service.js.map