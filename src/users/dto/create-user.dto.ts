import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username tidak boleh kosong' })
  userName: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @MinLength(6)
  password: string;
}