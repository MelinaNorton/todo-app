import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListSchema } from './schema/list.schema';
import { UserService } from 'src/users/user.service';
import { UserModule } from 'src/users/user.module';
import { userSchema } from 'src/users/schema/users.schema';
import { BcryptService } from 'src/auth/providers/bcrypt.service';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: "List", schema: ListSchema }]), 
    UserModule, 
    MongooseModule.forFeature([{ name: "User", schema: userSchema }]),
  ],
  controllers: [ListController],
  providers: [ListService, UserService, BcryptService],
})
export class ListModule {}
