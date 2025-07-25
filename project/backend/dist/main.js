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
    const redisUrl = process.env.REDIS_URL ?? process.env.REDISCLOUD_URL;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3004';
    if (redisUrl) {
        const client = new ioredis_1.default(redisUrl);
        client.on('connect', () => common_2.Logger.log('🔌 Redis connecting…', 'RedisLogger'));
        client.on('ready', () => common_2.Logger.log('✅ Redis ready', 'RedisLogger'));
        client.on('error', e => common_2.Logger.error(`Redis error: ${e.message}`, e.stack, 'RedisLogger'));
        client.on('reconnecting', () => common_2.Logger.warn('♻️ Redis reconnecting…', 'RedisLogger'));
        client.on('command', cmd => common_2.Logger.debug(`Redis command → ${cmd}`, 'RedisLogger'));
    }
    else {
        common_2.Logger.warn('No Redis URL configured; skipping Redis client setup', 'RedisLogger');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log', 'debug'],
    });
    app.use(cookieParser());
    app.enableCors({
        origin: frontendUrl,
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        skipMissingProperties: true
    }));
    const port = parseInt(process.env.PORT, 10) || 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map