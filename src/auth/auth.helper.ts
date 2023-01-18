import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthHelper {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly jwt: JwtService,
  ) {}

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public isPasswordValid(password: string, hashPassword: string): boolean {
    const validatePass = bcrypt.compareSync(password, hashPassword);
    return validatePass;
  }

  public generateToken(user: User): string {
    return this.jwt.sign({ id: user.id, email: user.userName });
  }

  public async validateUser(decoded: any): Promise<User> {
    return this.usersRepository.getUserById(decoded.id);
  }
}