import { Controller, Post, Body, HttpCode, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Signup } from './dto/signup.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { TokensService } from 'src/tokens/tokens.service';
import { Request} from 'express'
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';

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
  async signup(@Body() createAuthDto: Signup) {
    const user = await this.authService.signup(createAuthDto);
    return user
  }

//performs the login logic fia our service, then calls our tokenService to handle the logic for attaching a jwt
//http-only cookie
  @UseGuards(ThrottlerGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginAuthDto:Login, @Res({ passthrough: true }) res: Response, @Req() req: Request){
    const tokens = await this.authService.login(loginAuthDto, res, req)
    return tokens.accesstoken;
  }

//performs logout logic, bu passing the Response object to have it's auth-token detatched
  @HttpCode(204)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response){
    this.tokensService.detatchToken(res)
  }
}
