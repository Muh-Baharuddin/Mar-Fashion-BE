import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KaryawanService } from './karyawan.service';
import { KaryawanController } from './karyawan.controller';
import { Employees } from './entities/employees.entity';
import { Employee_Saving } from './entities/employee_saving.entity';
import { KaryawanRepository } from './karyawan.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employees, Employee_Saving])],
  providers: [KaryawanService, KaryawanRepository],
  controllers: [KaryawanController],
})
export class KaryawanModule {}
