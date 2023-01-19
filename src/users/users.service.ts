import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAllUser();

    if (!users.length) {
      throw new NotFoundException(`ups user not found`);
      this.logger.warn(`user tidak ketemu`);
    }

    return users;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = this.usersRepository.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`ups user not found`);
      this.logger.warn(`user tidak ketemu`);
    }

    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`ups user not found`);
      this.logger.warn(`user tidak ketemu`);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.createUser(createUserDto);

    if (!newUser) {
      throw new NotFoundException(`ups user tidak berhasil dibuat`);
      this.logger.warn(`user tidak berhasil dibuat`);
    }

    return newUser;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
