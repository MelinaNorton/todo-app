import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { TokenService } from './providers/token.service';

//define our authService as a private variable for use within the controller, but also an instance of TokenService 
//(which handles all operations/actions taken involving jwt)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService
  ) {}

//performs our user-signup/creation via our DTO defined in the body 
  @HttpCode(201)
  @Post('signup')
  signup(@Body() createAuthDto: Signup) {
    return this.authService.signup(createAuthDto);
  }

//performs the login logic fia our service, then calls our tokenService to handle the logic for attaching a jwt
//http-only cookie
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginAuthDto:Login, @Res({ passthrough: true }) res: Response){
    const token = await this.authService.login(loginAuthDto)
    await this.tokenService.attatchToken(token, res)
    return { success: true };
  }

//performs logout logic, bu passing the Response object to have it's auth-token detatched
  @HttpCode(204)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response){
    this.tokenService.detatchToken(res)
  }
}
