import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/'),
    PassportModule.register({defaultStrategy:'jwt'}),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
