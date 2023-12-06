import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationUserDto } from './dto/pagination-user.dto';
import { UserResponse } from './types/user.response.type';

@Injectable()
export class UsersRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  async findAllUser(
    paginationUserDto: PaginationUserDto,
  ): Promise<UserResponse> {
    const queryBuilder = this.repository.createQueryBuilder('user')
    .orderBy(`user.${paginationUserDto.orderBy}`, paginationUserDto.orderType)
    .skip((paginationUserDto.page - 1) * paginationUserDto.limit)
    .take(paginationUserDto.limit)
    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
    };
  }

  async findByUsername(userName: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { userName },
    });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.repository.save(createUserDto);
  }

  async updatePass(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.repository.save(updateUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.repository.update(id, updateUserDto);
    return {
      message: 'user berhasil diupdate',
    };
  }

  async removeUser(id: string) {
    await this.repository.delete(id);
    return {
      message: 'user berhasil dihapus'
    }
  }
}