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
import { ThrottlerModule, seconds } from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { ThrottlerModuleOptions } from '@nestjs/throttler';


//defines the MongoDB connectuon uri & registers jwt as our PassPort middleware's strategy; also aknowledges the other main
//modules within our progran, User & Auth and the App controller/provider
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:     true,
      envFilePath:  'app.env',
    }),
    MongooseModule.forRoot('mongodb+srv://linamelina0707:gfnmEAPfyM3BlMMJ@cluster0.gqer0il.mongodb.net/ToDoDB?retryWrites=true&w=majority'),
    PassportModule.register({defaultStrategy:'jwt'}),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      //our Throttler uses the async useFactory, so that we have time to check the Redis connection & decide if we need 
      //to use the other in-memory store instead
      useFactory: async (config: ConfigService): Promise<ThrottlerModuleOptions> => {
        const url = config.get<string>('REDIS_URL')!;
        try {
          //try & connext to Redis- if the ping succeeds, use it as your memory storage
          const client = new Redis(url);
          await client.ping();
          return {
            throttlers: [
              { limit: Number.MAX_SAFE_INTEGER, ttl: seconds(60) },  // test values
            ],
            storage: new ThrottlerStorageRedisService(url),
          };
        } catch (err) {
          //on error, omit the "storage: new ThrottlerStorageRedisService(url)"; Nest will use in-memory storage 
          console.warn(
            '[Throttler] Redis unavailable, falling back to in‑memory rate‑limiter',
            err.message,
          );
          return {
            throttlers: [
              { limit: 10, ttl: seconds(60) },
            ],
          };
        }
      },
    }),
    UserModule,
    AuthModule,
    ListModule,
    TokensModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
