import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthenticationService } from '../../../application/service/authentication.service';
import {UserDto} from "../request/user.dto";

@Controller('/api/v1/user')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get('/test')
  async test(@Res() response) {
    return response.status(HttpStatus.OK).json('Hello world!');
  }

  @Get('/one')
  async getOne(@Res() response) {
    const data = await this.authenticationService.getOne();

    return response.status(HttpStatus.OK).json(data);
  }

  @Get('/all')
  async getAll(@Res() response) {
    const data = await this.authenticationService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }

  @Post('/signup')
  async signup(@Res() response, @Body() user: UserDto) {
    console.log(user);
    const newUSer = await this.authenticationService.signup(user);
    return response.status(HttpStatus.CREATED).json({
      newUSer,
    });
  }

  @Post('/signin')
  async signIn(@Res() response, @Body() user: UserDto) {
    const token = await this.authenticationService.signin(user);
    return response.status(HttpStatus.OK).json(token);
  }
}
