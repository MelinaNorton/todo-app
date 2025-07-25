import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './users/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TokensModule } from './tokens/tokens.module';
import { ConfigModule } from '@nestjs/config';

//defines the MongoDB connectuon uri & registers jwt as our PassPort middleware's strategy; also aknowledges the other main
//modules within our progran, User & Auth and the App controller/provider
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({
      isGlobal:     true,
      envFilePath:  'app.env',
    }),
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/ToDoDB?retryWrites=true&w=majority'),
    PassportModule.register({defaultStrategy:'jwt'}),
    UserModule,
    AuthModule,
    ListModule,
    TokensModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
