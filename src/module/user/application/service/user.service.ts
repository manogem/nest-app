import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../infrastructure/model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserReadRepository } from '../../infrastructure/repository/user.read.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserReadRepository)
    private usersRepository: UserReadRepository,
  ) {}

  getOne = async (id: number): Promise<UserEntity> => {
    return await this.usersRepository.getOne(id);
  };

  getAll = async (): Promise<UserEntity[]> => {
    return await this.usersRepository.getAll();
  };
}
