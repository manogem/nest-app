import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  readonly firstName: string;

  @Length(3, 20)
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @Length(3, 20)
  password: string;
}
