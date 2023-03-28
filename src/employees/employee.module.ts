import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './service/employee.service';
import { EmployeeController } from './controller/employee.controller';
import { Employee } from './entities/employee.entity';
import { Employee_Saving } from './entities/employee_saving.entity';
import { EmployeeRepository } from './repository/employee.repository';
import { EmployeeSavingService } from './service/employee-saving.service';
import { SavingRepository } from './repository/employee-saving.repository';
import { EmployeeSavingController } from './controller/employee-saving.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Employee_Saving])],
  providers: [EmployeeService, EmployeeRepository, EmployeeSavingService, SavingRepository],
  controllers: [EmployeeController, EmployeeSavingController],
})
export class EmployeeModule {}
