import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Test } from './test.entity';
import { TestRepository } from './test.repository';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);

  constructor(private readonly testRepository: TestRepository) {}

  async getTestById(id: string): Promise<Test> {
    const test = await this.getTestById(id);

    if (!test) {
      throw new NotFoundException(`Test not found`);
      this.logger.warn(`test tidak ketemu`);
    }

    return test;
  }
}
