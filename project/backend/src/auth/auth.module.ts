import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BcryptService } from './providers/bcrypt.service';
import { TokensModule } from 'src/tokens/tokens.module';
import { JwtStrategy } from 'src/tokens/strategies/jwt.strategy';
import { ListModule } from 'src/list/list.module';

@Module({
  imports:[
    UserModule,
    TokensModule,
    ListModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [UserModule, ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_ACCESS_EXPIRES'),
          },
      })
    }),],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, JwtStrategy],
  exports: [PassportModule]
})
export class AuthModule {}
