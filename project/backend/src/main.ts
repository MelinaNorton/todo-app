import 'reflect-metadata'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { Logger } from '@nestjs/common';
import Redis from 'ioredis';
//defines the strategies we use for carrying out the jwt authentication process, cookieParser, as well as
//1) initializes our app, 2) enables CORS originating from the specified port (with credentials)
//and hooks our Validation Pipe into our middleware (whitelist->only decorated (type-defined DTOs aknowledged transform->
//apply our defined type-conversions & converts incoming JSON->instane of the DTO class)
async function bootstrap() {
  const redisUrl = process.env.REDIS_URL ?? process.env.REDISCLOUD_URL!;
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3004';
  //this is the ioredis client, instantiated BEFORE AppModule- this allows for logs like connections & ready to fire 
  // (which would be missed if grabbed from AppModule)
  if (redisUrl) {
    const client = new Redis(redisUrl);
    client.on('connect',      () => Logger.log('🔌 Redis connecting…','RedisLogger'));
    client.on('ready',        () => Logger.log('✅ Redis ready','RedisLogger'));
    client.on('error',        e => Logger.error(`Redis error: ${e.message}`, e.stack,'RedisLogger'));
    client.on('reconnecting', () => Logger.warn('♻️ Redis reconnecting…','RedisLogger'));
    client.on('command',      cmd => Logger.debug(`Redis command → ${cmd}`,'RedisLogger'));
  } else {
    Logger.warn('No Redis URL configured; skipping Redis client setup','RedisLogger');
  }
  //our Logger calls above for Redis are "debug" level; in order to see this, we must enable in our app "debug"-level
  //logs, which is not the default
  const app = await NestFactory.create(AppModule, {
    logger: ['error','warn','log','debug'],
  });
  
  //our other middleware
  app.use(cookieParser());
  app.enableCors({
    origin: frontendUrl,//port that we use in frontend
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    skipMissingProperties: true
  }));

  const port = parseInt(process.env.PORT!, 10) || 3000;
  await app.listen(port);
}

bootstrap();
