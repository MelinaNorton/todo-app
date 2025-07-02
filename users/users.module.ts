import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users } from './interface/users.interface';
import { userSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Users", schema: userSchema }]),
    JwtModule,  
    ConfigModule, 
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
