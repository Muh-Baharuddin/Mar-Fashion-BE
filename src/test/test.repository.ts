import { AbstractRepository, EntityRepository } from 'typeorm';
import { Test } from './test.entity';

@EntityRepository(Test)
export class TestRepository extends AbstractRepository<Test> {
  async getTestById(id: string): Promise<Test> {
    return this.repository.findOne({
      where: { id },
    });
  }
}
