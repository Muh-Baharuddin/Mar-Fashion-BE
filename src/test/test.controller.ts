import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Controller('claims')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  async getById(@Param('id', ParseUUIDPipe) testId: string): Promise<Test> {
    return this.testService.getTestById(testId);
  }
}
