import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthDto: Signup) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  async login(@Body() loginAuthDto:Login, @Res({ passthrough: true }) res: Response){
    const token = await this.authService.login(loginAuthDto)
    res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: '/',
    });
    return { success: true };
  }
}
