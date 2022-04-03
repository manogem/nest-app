import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../../../application/service/authentication.service';
import { CreateUserDto } from '../request/create-user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() user: CreateUserDto) {
    return await this.authenticationService.signUp(user);
  }

  @Post('/sign-in')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() req) {
    return await this.authenticationService.signIn(req.user);
  }
}
