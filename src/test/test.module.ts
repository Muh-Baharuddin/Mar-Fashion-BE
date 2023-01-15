import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { TestRepository } from './test.repository';
import { TestService } from './test.service';
import { TestController } from './test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestRepository])],
  providers: [TestService],
  controllers: [TestController],
  exports: [TestService],
})
export class TestsModule {}
