"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const common_2 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
async function bootstrap() {
    const client = new ioredis_1.default(process.env.REDIS_URL);
    client.on('connect', () => common_2.Logger.log('🔌 Redis connecting…'));
    client.on('ready', () => common_2.Logger.log('✅ Redis ready'));
    client.on('error', e => common_2.Logger.error(`Redis error: ${e.message}`, e.stack));
    client.on('reconnecting', () => common_2.Logger.warn('♻️ Redis reconnecting…'));
    client.on('command', cmd => common_2.Logger.debug(`Redis command → ${cmd}`));
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3004',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        skipMissingProperties: true
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map