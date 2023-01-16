import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) testId: string): Promise<Test> {
    return this.testService.getTestById(testId);
  }
  
  
}
