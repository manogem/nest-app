import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure/model/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthenticationWriteRepository } from '../../infrastructure/repository/authentication.write.repository';
import { CreateUserDto } from '../../ui/web/request/create-user.dto';
import { UserEmailAlreadyExistsException } from "../../domain/exception/user-email-already-exists.exception";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationWriteRepository)
    private authenticationWriteRepository: AuthenticationWriteRepository,
    private jwtService: JwtService,
  ) {}

  signUp = async (user: CreateUserDto): Promise<UserEntity> => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.authenticationWriteRepository.persist(user);
  };

  validateUser = async (username: string, password: string): Promise<UserEntity|null> => {
    const user = await this.authenticationWriteRepository.getOneByEmail(
      username,
    );

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  };

  signIn = async (user: any): Promise<any> => {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.userId,
      }),
    };
  };
}
