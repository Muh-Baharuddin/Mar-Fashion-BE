import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UserResponse } from './types/user.response.type';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAllUser(
    paginationDto: PaginationUserDto,
  ): Promise<UserResponse> {
    return await this.usersRepository.findAllUser(paginationDto);
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

  async updatePass(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    user.password = updateUserDto.password;

    const salt: string = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);

    return this.usersRepository.updatePass(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`ups user not found`);
    }
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async removeUser(id: string) {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('user tidak ditemukan');
    }
    return this.usersRepository.removeUser(id);
  }
}

