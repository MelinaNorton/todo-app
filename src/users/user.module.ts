import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { userSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: userSchema }]),
    JwtModule,  
    ConfigModule, 
  ],
  controllers: [UsersController],
  providers: [UserService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
