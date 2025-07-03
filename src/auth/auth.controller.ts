import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from './providers/token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

  @HttpCode(201)
  @Post('signup')
  signup(@Body() createAuthDto: Signup) {
    return this.authService.signup(createAuthDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginAuthDto:Login, @Res({ passthrough: true }) res: Response){
    const token = await this.authService.login(loginAuthDto)
    await this.tokenService.attatchToken(token, res)
    return { success: true };
  }

  @HttpCode(204)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response){
    this.tokenService.detatchToken(res)
  }
}
