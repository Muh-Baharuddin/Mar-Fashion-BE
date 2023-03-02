import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Karyawan } from './entities/karyawan.entity';
import { EmployeeRepository } from './employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Karyawan])],
  providers: [EmployeeService, EmployeeRepository],
  controllers: [EmployeeController],
})
export class KaryawanModule {}
