import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { userSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
import { ListService } from 'src/list/list.service';
import { ListModule } from 'src/list/list.module';
import { forwardRef } from '@nestjs/common';
//imports the Mongoose Model initialzed on the user-schema for performing the necessary functions (find findAnd... etc)
//aknowledges controllers used in module & exports UserService, so that any actions involving the User data can be taken
//where needed outside the module
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
