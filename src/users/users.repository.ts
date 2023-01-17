import { Injectable } from '@nestjs/common';
import { AbstractRepository, DataSource, EntityRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// @Injectable()
// export class TestRepository {
//   constructor(private dataSource: DataSource) { }

//   async getTestById(id: string): Promise<Test> {
//     return this.dataSource.getRepository(Test).findOne({
//       where: { id },
//     });
//   }
// }

@Injectable()
export class UsersRepository {
  private repository;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(User);
  }

  findAllUser(): Promise<User> {
    return this.repository.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.repository.save(createUserDto)
  }
}
