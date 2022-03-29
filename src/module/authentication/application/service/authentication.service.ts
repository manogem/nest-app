import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserEntity} from '../../infrastructure/model/user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthenticationReadRepository} from "../../infrastructure/repository/authentication.read.repository";
import {UserDto} from "../../ui/web/request/user.dto";

@Injectable()
export class AuthenticationService {
  constructor(
      @InjectRepository(AuthenticationReadRepository)
      private usersRepository: AuthenticationReadRepository,
      private jwtService: JwtService,
  ) {}

  async getOneByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOneByEmail(email);
  }

  async getOne(): Promise<UserEntity> {
    return await this.usersRepository.findOne();
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.usersRepository.findAll();
  }


  async signup(user: UserDto): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.usersRepository.persist(user);
  }

  async signin(user: UserDto): Promise<any> {
    const foundUser = await this.usersRepository.findOneByEmail(user.email);

    if (foundUser) {
      const { password } = foundUser;
      if (bcrypt.compare(user.password, password)) {
        const payload = { email: user.email };
        return {
          token: this.jwtService.sign(payload),
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
