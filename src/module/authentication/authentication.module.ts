import { Module } from '@nestjs/common';
import { AuthenticationController } from './ui/web/controller/authentication.controller';
import { AuthenticationService } from './application/service/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { secret } from '../../constants/secret';
import { UserEntity } from './infrastructure/model/user.entity';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthenticationWriteRepository} from "./infrastructure/repository/authentication.write.repository";
import {LocalStrategy} from "./application/strategy/local.strategy";
import {JwtStrategy} from "./application/strategy/jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthenticationWriteRepository]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    PassportModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy
  ],
})
export class AuthenticationModule {}
