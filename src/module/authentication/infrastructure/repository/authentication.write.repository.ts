import {UserEntity} from "../model/user.entity";
import {EntityRepository, Repository} from "typeorm";
import {UserDto} from "../../ui/web/request/user.dto";

@EntityRepository(UserEntity)
export class AuthenticationWriteRepository extends Repository<UserEntity>
{
    getOneByEmail = async (email: string): Promise<UserEntity> =>
    {
        return await this.findOneOrFail({ email });
    };

    persist = async (user: UserDto): Promise<UserEntity> =>
    {
        const userEntity = new UserEntity();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.createDate = new Date();

        return await this.save(userEntity);
    };
}
