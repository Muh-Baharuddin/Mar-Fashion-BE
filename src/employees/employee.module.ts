import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employees } from './entities/Employees.entity';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employees])],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
