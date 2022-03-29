import { Controller, Get, HttpStatus, Res, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../../../application/service/user.service';
import {JwtAuthGuard} from "../../../../authentication/ui/web/guard/jwt-auth.guard";

@Controller('/api/v1/users')
export class UserController {
  constructor(
    private readonly authenticationService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getOne(@Res() response, @Param('id') id: number) {
    const data = await this.authenticationService.getOne(id);

    return response.status(HttpStatus.OK).json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAll(@Res() response) {
    const data = await this.authenticationService.getAll();

    return response.status(HttpStatus.OK).json(data);
  }
}
