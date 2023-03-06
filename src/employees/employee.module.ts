import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/Employees.entity';
import { Employee_Saving } from './entities/employee_saving.entity';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Employee_Saving])],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
