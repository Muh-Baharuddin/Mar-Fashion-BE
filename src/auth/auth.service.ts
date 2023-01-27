import {
  Injectable,
  Inject,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { AuthHelper } from './auth.helper';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthHelper)
    @Inject(UsersRepository)
    private readonly authHelper: AuthHelper,
    private readonly usersRepository: UsersRepository,
    private usersService: UsersService,
  ) {}

  async register({
    userName,
    password,
    confirmPass,
  }: RegisterDto): Promise<User> {
    let user = await this.usersRepository.findByUsername(userName);

    if (user) {
      throw new ConflictException('username tersebut telah terdaftar');
    }

    if (password !== confirmPass) {
      throw new BadRequestException('password tidak sama');
    }

    user = new User();
    user.userName = userName;
    user.password = this.authHelper.encodePassword(password);

    return this.usersRepository.createUser(user);
  }

  async login({ userName, password }: LoginDto): Promise<LoginResponse> {
    const user = await this.usersRepository.findByUsername(userName);

    if (!user) {
      throw new UnauthorizedException('user tidak ditemukan');
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('password salah');
    }
    return this.authHelper.generateToken(user);
  }

  public async refresh(user: User): Promise<string> {
    return this.authHelper.generateToken(user);
  }
}
