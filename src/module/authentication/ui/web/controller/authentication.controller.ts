import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from '../../../application/service/authentication.service';
import { UserEntity } from '../../../../../schema/user.entity';

@Controller('/api/v1/user')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get('/test')
  async test(@Res() response) {
    return response.status(HttpStatus.OK).json('Hello world!');
  }

  @Post('/signup')
  async signup(@Res() response, @Body() user: UserEntity) {
    const newUSer = await this.authenticationService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async signIn(@Res() response, @Body() user: UserEntity) {
    const token = await this.authenticationService.signin(user);
    return response.status(HttpStatus.OK).json(token);
  }
}
