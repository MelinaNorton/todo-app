import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { Request} from 'express'
//define our authService as a private variable for use within the controller, but also an instance of TokenService 
//(which handles all operations/actions taken involving jwt)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokensService: TokensService
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
  async login(@Body() loginAuthDto:Login, @Res({ passthrough: true }) res: Response, @Req() req: Request){
    console.log("Ran at Backend controller, /auth.controller")
    const tokens = await this.authService.login(loginAuthDto, res, req)
    console.log("Tokens returned to login controller: ", tokens)
    return tokens.accesstoken;
  }

//performs logout logic, bu passing the Response object to have it's auth-token detatched
  @HttpCode(204)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response){
    this.tokensService.detatchToken(res)
  }
}
