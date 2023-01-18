import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/users.repository';
import { AuthHelper } from './auth.helper';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthHelper)
    @Inject(UsersRepository)
    private readonly authHelper: AuthHelper,
    private readonly usersRepository: UsersRepository,
    private usersService: UsersService,
  ) {}

  async register(authDto: AuthDto): Promise<User> {
    const { userName, password }: AuthDto = authDto;
    let user: User = await this.usersRepository.findByUsername(userName);

    // if (user != undefined) {
    //   throw new HttpException('Conflict', HttpStatus.CONFLICT);
    // }

    user = new User();
    user.userName = userName;
    user.password = this.authHelper.encodePassword(password);

    return this.usersRepository.createUser(user);
  }

  async login(authDto: AuthDto): Promise<string> {
    const { userName, password }: AuthDto = authDto;
    const user: User = await this.usersRepository.findByUsername(userName);

    if (!user) {
      throw new HttpException('username tidak ditemukan', HttpStatus.NOT_FOUND);
    }
    console.log(password);
    console.log(user.password);

    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (isPasswordValid == false) {
      throw new HttpException('Incorrect Password', HttpStatus.NOT_FOUND);
    }

    return this.authHelper.generateToken(user);
  }
}
