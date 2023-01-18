import { IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsNotEmpty({ message: 'username tidak boleh kosong' })
  public readonly userName: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @MinLength(6)
  public readonly password: string;
}