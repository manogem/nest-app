import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserEntity} from '../../../../schema/user.entity';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {InsertResult, Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AuthenticationService {
  constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      private jwtService: JwtService,
  ) {}

  async getOne(email): Promise<UserEntity> {
    return await this.usersRepository.findOne({ email });
  }

  async signup(user: UserEntity): Promise<InsertResult> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    return this.usersRepository.insert(user);
  }

  async signin(user: UserEntity): Promise<any> {
    const foundUser = await this.usersRepository.findOne({ email: user.email });

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
