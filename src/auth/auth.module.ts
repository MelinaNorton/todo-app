import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from '../tokens/strategies/jwt.refreshStrategy';
import { BcryptService } from './providers/bcrypt.service';
import { TokensService } from 'src/tokens/tokens.service';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports:[
    UserModule,
    TokensModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [UserModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
      })
    }),],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
