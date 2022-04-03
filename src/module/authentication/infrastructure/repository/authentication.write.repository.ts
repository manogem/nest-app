import { UserEntity } from '../model/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../../ui/web/request/create-user.dto';

@EntityRepository(UserEntity)
export class AuthenticationWriteRepository extends Repository<UserEntity> {
  getOneByEmail = async (email: string): Promise<UserEntity> => {
    return await this.findOne({ email });
  };

  persist = async (user: CreateUserDto): Promise<UserEntity> => {
    const userEntity = new UserEntity();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.createDate = new Date();

    return await this.save(userEntity);
  };
}
