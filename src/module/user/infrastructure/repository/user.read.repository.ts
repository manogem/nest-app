import { UserEntity } from '../model/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserReadRepository extends Repository<UserEntity> {
  getOne = async (id: number): Promise<UserEntity> => {
    return await this.findOneOrFail(id);
  };

  getAll = async (): Promise<UserEntity[]> => {
    return await this.find();
  };
}
