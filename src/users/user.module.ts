import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { userSchema } from './schema/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { BcryptService } from 'src/auth/providers/bcrypt.service';
import { ToDoListService } from './todolist/todolist.service';
import { ToDoController } from './todolist/todo.controller';
import { TodoItemSchema } from './schema/listitems.schema';
import { ToDoListSchema } from './todolist/schemas/todolist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: userSchema }]),
    MongooseModule.forFeature([{ name: "ToDoList", schema: ToDoListSchema }]),
    JwtModule,  
    ConfigModule, 
  ],
  controllers: [UsersController, ToDoController],
  providers: [UserService, BcryptService, ToDoListService],
  exports: [UserService],
})
export class UserModule {}
