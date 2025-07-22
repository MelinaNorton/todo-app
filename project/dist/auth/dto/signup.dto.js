"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Signup = void 0;
var class_validator_1 = require("@nestjs/class-validator");
var Signup = (function () {
    function Signup() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Signup.prototype, "username");
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Signup.prototype, "firstname");
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Signup.prototype, "lastname");
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Signup.prototype, "password");
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], Signup.prototype, "email");
    __decorate([
        (0, class_validator_1.IsArray)(),
        __metadata("design:type", Array)
    ], Signup.prototype, "items");
    return Signup;
}());
exports.Signup = Signup;
//# sourceMappingURL=signup.dto.js.map