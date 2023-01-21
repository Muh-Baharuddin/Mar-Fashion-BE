import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNotEmpty({ message: 'password tidak boleh kosong' })
  // @MinLength(6)
  // new_password: string;
}