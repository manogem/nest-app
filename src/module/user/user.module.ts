import { Module } from '@nestjs/common';
import { UserController } from './ui/web/controller/user.controller';
import { UserService } from './application/service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../../constants/secret';
import { UserEntity } from './infrastructure/model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserReadRepository } from './infrastructure/repository/user.read.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserReadRepository]),
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
