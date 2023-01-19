import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'username tidak boleh kosong' })
  public readonly userName: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @MinLength(6)
  public readonly password: string;

  @IsNotEmpty({ message: 'konfirmasi password tidak boleh kosong' })
  @MinLength(6)
  public readonly confirmPass: string;
}

export class LoginDto {
  @IsNotEmpty({ message: 'username tidak boleh kosong' })
  public readonly userName: string;

  @IsNotEmpty({ message: 'password tidak boleh kosong' })
  @MinLength(6)
  public readonly password: string;
}