import {UserEntity} from "../model/user.entity";
import {EntityRepository, Repository} from "typeorm";
import {UserDto} from "../../ui/web/request/user.dto";

@EntityRepository(UserEntity)
export class AuthenticationReadRepository extends Repository<UserEntity>
{
    findOne = async (): Promise<UserEntity> => {
        return await this.findOneOrFail(1);
    };

    findOneByEmail = async (email: string): Promise<UserEntity> => {
        return await this.findOneOrFail({ email });
    };

    findAll = async (): Promise<UserEntity[]> => {
        return await this.findAll();
    };

    persist = async (user: UserDto): Promise<UserEntity> => {
        const userEntity = new UserEntity();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.createDate = new Date();

        return await this.save(userEntity);
    };
}
