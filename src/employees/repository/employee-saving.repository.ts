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
    const { employeeId, ...savingData } = createSavingDto;
    const newItem = this.savingRepository.create(savingData);
    if (employeeId) {
      const employeeData = await this.findEmployeeById(employeeId);
      if (!employeeData) {
        throw new Error(`employee with id ${employeeId} not found.`);
      }
      newItem.employee = Promise.resolve(employeeData);

      if (newItem.type === TypeSaving.SIMPANAN) {
        employeeData.total_saving += newItem.total;
        await this.employeeRepository.save(employeeData);
      }

      if (newItem.type === TypeSaving.AMBILAN) {
        employeeData.total_saving -= newItem.total;
        await this.employeeRepository.save(employeeData);
      }
    }
    return this.savingRepository.save(newItem);
  }

  // async updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto) {
  //   const newSupplier = await this.findSupplierById(id);
  //   if (!newSupplier) {
  //     throw new Error(`Supplier with id ${id} not found.`);
  //   }
  //   Object.assign(newSupplier, updateSupplierDto);
  //   await this.repository.save(newSupplier);
  //   return {
  //     message: 'Update Supplier Success',
  //   };
  // }

  // async removeSupplier(id: string) {
  //   await this.repository.delete(id);
  //   return {
  //     message: 'supplier berhasil dihapus',
  //   };
  // }
}
