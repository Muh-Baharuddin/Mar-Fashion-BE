import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee_Saving } from '../entities/employee_saving.entity';
import { PaginationSavingDto } from '../dto/pagination-employee-saving.dto';
import { EmployeeSavingResponse } from '../types/employee-response.type';
import { CreateEmployeeSavingDto } from '../dto/create-saving.dto';
import { Employee } from '../entities/employee.entity';
import { TypeSaving } from '../types/type-saving.enum';
import { UpdateEmployeeSavingDto } from '../dto/update-saving.dto';

@Injectable()
export class SavingRepository {
  private savingRepository: Repository<Employee_Saving>;
  private employeeRepository: Repository<Employee>;

  constructor(private dataSource: DataSource) {
    this.savingRepository = this.dataSource.getRepository(Employee_Saving);
    this.employeeRepository = this.dataSource.getRepository(Employee);
  }

  async findAllSaving(
    paginationDto: PaginationSavingDto,
  ): Promise<EmployeeSavingResponse> {
    const qb = this.savingRepository.createQueryBuilder('employee_Saving')
      .leftJoinAndSelect('employee_Saving.employee', 'employee')
    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            employee_Saving.date, ' ', 
            employee_Saving.type, ' ', 
            employee_Saving.total, ' ', 
            employee_Saving.description) ILike :keywords`, 
            { 
              keywords: `%${paginationDto.keywords}%` 
            });
        })
      );
    }
    if (paginationDto.orderBy === 'employee') {
      qb.orderBy('employee.name', paginationDto.orderType)
    } else {
      qb.orderBy(`employee_Saving.${paginationDto.orderBy}`, paginationDto.orderType)
    }
    qb.skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)
    
    const [data, total] = await qb.getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findSavingById(id: string): Promise<Employee_Saving> {
    return this.savingRepository.findOne({
      where: { id },
    });
  }

  findEmployeeById(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: { id },
    });
  }

  async createEmployeeSaving(createSavingDto: CreateEmployeeSavingDto): Promise<Employee_Saving> {
    const { __employee__, ...savingData } = createSavingDto;
    const newItem = this.savingRepository.create(savingData);
    if (__employee__) {
      const employee = await this.findEmployeeById(__employee__.id);
      if (!employee) {
        throw new Error(`employee with id ${__employee__.id} not found.`);
      }
      newItem.employee = Promise.resolve(employee);

      if (newItem.type === TypeSaving.SIMPANAN) {
        employee.total_saving += newItem.total;
        await this.employeeRepository.save(employee);
      }

      if (newItem.type === TypeSaving.AMBILAN) {
        employee.total_saving -= newItem.total;
        await this.employeeRepository.save(employee);
      }
    }
    return this.savingRepository.save(newItem);
  }

  async updateEmployeeSaving(id: string, updateSavingDto: UpdateEmployeeSavingDto) {
    const newSaving = await this.findSavingById(id);
    if (!newSaving) {
      throw new Error(`Employee saving with id ${id} not found.`);
    }
    const employee = await this.findEmployeeById(updateSavingDto.__employee__.id);
    Object.assign(newSaving, updateSavingDto);
    if (updateSavingDto.type === TypeSaving.SIMPANAN) {
      employee.total_saving += (newSaving.total * 2);
      await this.employeeRepository.save(employee);
    }

    if (updateSavingDto.type === TypeSaving.AMBILAN) {
      employee.total_saving -= (newSaving.total * 2);
      await this.employeeRepository.save(employee);
    }
    await this.savingRepository.save(newSaving);
    return {
      message: 'Update Employee Saving Success',
    };
  }

  async removeEmployeeSaving(id: string) {
    await this.savingRepository.delete(id);
    return {
      message: 'Delete Employee Saving Success',
    };
  }
}
