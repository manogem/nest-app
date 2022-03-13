import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationController } from './ui/web/controller/authentication.controller';
import { AuthenticationService } from './application/service/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../../constants/secret';
import { UserEntity } from '../../schema/user.entity';
import { isAuthenticated } from './ui/web/middleware/authentication.middleware';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated);
  }
}
