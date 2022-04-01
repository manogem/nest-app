import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from '../../../application/service/authentication.service';
import { CreateUserDto } from '../request/create-user.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('/api/v1/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/sign-up')
  async signUp(@Res() response, @Body() user: CreateUserDto) {
    const newUser = await this.authenticationService.signUp(user);

    return response.status(HttpStatus.CREATED).json(newUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  async signIn(@Res() response, @Req() req) {
    const token = await this.authenticationService.signIn(req.user);

    return response.status(HttpStatus.OK).json(token);
  }
}
