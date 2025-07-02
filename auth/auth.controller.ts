import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signup(@Body() createAuthDto: Signup) {
    return this.authService.signup(createAuthDto);
  }

  @Post()
  login(@Body() loginAuthDto:Login){
    return this.authService.login(loginAuthDto)
  }
}
