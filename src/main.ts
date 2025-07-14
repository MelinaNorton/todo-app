import 'reflect-metadata'; 
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

//defines the strategies we use for carrying out the jwt authentication process, cookieParser, as well as
//1) initializes our app, 2) enables CORS originating from the specified port (with credentials)
//and hooks our Validation Pipe into our middleware (whitelist->only decorated (type-defined DTOs aknowledged transform->
//apply our defined type-conversions & converts incoming JSON->instane of the DTO class)
async function bootstrap() {
  console.log(process.env)
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:3004',//port that we use in frontend
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',

  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
