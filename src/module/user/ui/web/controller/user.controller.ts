import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserService } from '../../../application/service/user.service';
import { JwtAuthGuard } from '../../../../authentication/ui/web/guard/jwt-auth.guard';

@Controller('/users')
export class UserController {
  constructor(private readonly authenticationService: UserService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.authenticationService.getAll();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: number) {
    return await this.authenticationService.getOne(id);
  }
}
