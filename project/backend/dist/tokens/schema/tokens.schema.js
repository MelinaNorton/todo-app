"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSchema = void 0;
const mongoose_1 = require("mongoose");
exports.tokenSchema = new mongoose_1.Schema({
    sub: { type: String, required: false },
    jti: { type: String, required: true },
    createdAt: { type: String, required: false },
    expiresAt: { type: String, required: false },
});
//# sourceMappingURL=tokens.schema.js.map