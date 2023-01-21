import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  findAllUser(): Promise<User[]> {
    return this.repository.find();
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
}