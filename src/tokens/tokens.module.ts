import { Module } from '@nestjs/common';
import { JwtRefreshStrategy } from 'src/tokens/strategies/jwt.refreshStrategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from 'src/users/user.module';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { MongooseModule } from '@nestjs/mongoose';
import { tokenSchema } from './schema/tokens.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtRefreshGuard } from './guards/jwt.guards';

@Module({
  imports:[
    ConfigModule,
    PassportModule,
      JwtModule.registerAsync({
      inject:  [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret:     config.get<string>('JWT_REFRESH_SECRET'),
        signOptions:{ expiresIn: config.get<string | number>('JWT_REFRESH_EXPIRES') },
      }),
    }),
    MongooseModule.forFeature([{ name: "Token", schema: tokenSchema }]),
],
  controllers: [TokensController],
  providers: [TokensService, JwtRefreshStrategy, JwtRefreshGuard],
  exports: [TokensService]
})
export class TokensModule {}


