import { BadRequestException, Injectable } from '@nestjs/common';
import { AbstractRepository, DataSource, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  private repository;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  findAllUser(): Promise<User> {
    return this.repository.find();
  }

  async findByUsername(userName: string): Promise<User | undefined> {
    const user = await this.repository.find({
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

  // async hashPassword(password: string) {
  //   const saltOrRound = 10;

  //   const hashedPassword = await bcrypt.hash(password, saltOrRound);

  //   return hashedPassword
  // }
}
//   const hashedPassword = await this.hashPassword(createUserDto.password)

//     createUserDto.password = hashedPassword;
//     return this.repository.save(createUserDto);

