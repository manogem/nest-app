import {Injectable} from '@nestjs/common';
import {UserEntity} from '../../infrastructure/model/user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthenticationWriteRepository} from "../../infrastructure/repository/authentication.write.repository";
import {UserDto} from "../../ui/web/request/user.dto";

@Injectable()
export class AuthenticationService {
  constructor(
      @InjectRepository(AuthenticationWriteRepository)
      private authenticationWriteRepository: AuthenticationWriteRepository,
      private jwtService: JwtService,
  ) {}

  signUp = async (user: UserDto): Promise<UserEntity> => {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.authenticationWriteRepository.persist(user);
  };

  validateUser = async (username: string, password: string): Promise<any> => {
    const user = await this.authenticationWriteRepository.getOneByEmail(username);

    if (bcrypt.compare(user.password, password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  };

  signIn = async (user: any): Promise<any> => {
    console.log(user);
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  };
}
