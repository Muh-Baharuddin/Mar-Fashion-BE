import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { EmployeeResponse, EmployeeSavingResponse } from '../types/employee-response.type';
import { Employee_Saving } from '../entities/employee_saving.entity';
import { SavingRepository } from '../repository/employee-saving.repository';
import { PaginationSavingDto } from '../dto/pagination-employee-saving.dto';
import { CreateEmployeeSavingDto } from '../dto/create-saving.dto';

@Injectable()
export class EmployeeSavingService {
  private readonly logger = new Logger(EmployeeSavingService.name);

  constructor(
    @Inject(SavingRepository)
    private readonly savingRepository: SavingRepository,
  ) {}

  async findAllSaving(
    paginationDto: PaginationSavingDto,
  ): Promise<EmployeeSavingResponse> {
    return await this.savingRepository.findAllSaving(paginationDto);
  }

  // async findSavingById(id: string): Promise<Employee_Saving> {
  //   const Saving = await this.savingRepository.findSavingById(id);

  //   if (!Saving) {
  //     throw new NotFoundException(`ups employee saving not found`);
  //     this.logger.warn(`Employee saving not found`);
  //   }
  //   return Saving;
  // }

  createSaving(createEmployeeSavingDto: CreateEmployeeSavingDto): Promise<Employee_Saving> {
    return this.savingRepository.createEmployeeSaving(createEmployeeSavingDto);
  }

  // async updateEmployees(id: string, updateEmployeeDto: UpdateEmployeeDto) {
  //   const Employees = await this.employeeRepository.findById(id);

  //   if (!Employees) {
  //     throw new NotFoundException(`ups Employees not found`);
  //     this.logger.warn(`employees not found`);
  //   }
  //   return this.employeeRepository.updateEmployees(id, updateEmployeeDto);
  // }

  // async removeEmployees(id: string) {
  //   const Employees = await this.employeeRepository.findById(id);

  //   if (!Employees) {
  //     throw new NotFoundException(`ups Employees not found`);
  //     this.logger.warn(`employees not found`);
  //   }
  //   return this.employeeRepository.removeEmployees(id);
  // }
}
