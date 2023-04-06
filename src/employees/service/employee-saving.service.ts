import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EmployeeSavingResponse } from '../types/employee-response.type';
import { Employee_Saving } from '../entities/employee_saving.entity';
import { SavingRepository } from '../repository/employee-saving.repository';
import { PaginationSavingDto } from '../dto/pagination-employee-saving.dto';
import { CreateEmployeeSavingDto } from '../dto/create-saving.dto';
import { UpdateEmployeeSavingDto } from '../dto/update-saving.dto';

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

  createSaving(createEmployeeSavingDto: CreateEmployeeSavingDto): Promise<Employee_Saving> {
    return this.savingRepository.createEmployeeSaving(createEmployeeSavingDto);
  }

  async updateSaving(id: string, updateSavingDto: UpdateEmployeeSavingDto) {
    return this.savingRepository.updateEmployeeSaving(id, updateSavingDto);
  }

  async removeSaving(id: string) {
    const saving = await this.savingRepository.findSavingById(id);

    if (!saving) {
      throw new NotFoundException(`ups employee saving not found`);
    }

    return this.savingRepository.removeEmployeeSaving(id);
  }
}
