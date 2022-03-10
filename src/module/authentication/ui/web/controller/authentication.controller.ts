import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthenticationService } from '../../../application/service/authentication.service';
import { User } from '../../../../../schema/user';

@Controller('/api/v1/user')
export class AuthenticationController {
  constructor(
    private readonly userServerice: AuthenticationService,
    private jwtService: JwtService,
  ) {}

  @Get('/test')
  async test(@Res() response) {
    return response.status(HttpStatus.OK).json('Hello world!');
  }

  @Post('/signup')
  async signup(@Res() response, @Body() user: User) {
    const newUSer = await this.userServerice.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async signIn(@Res() response, @Body() user: User) {
    const token = await this.userServerice.signin(user, this.jwtService);
    return response.status(HttpStatus.OK).json(token);
  }
}
