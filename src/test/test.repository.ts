import { Injectable } from '@nestjs/common';
import { AbstractRepository, DataSource, EntityRepository } from 'typeorm';
import { Test } from './test.entity';

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
export class TestRepository {
  private repository;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Test);
  }

  async getTestById(id: string): Promise<Test> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
