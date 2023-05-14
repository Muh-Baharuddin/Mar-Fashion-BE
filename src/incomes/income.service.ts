import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { IncomeRepository } from './income.repository';
import { PaginationIncomeDto } from './dto/pagination-income.dto';
import { IncomeResponse } from './types/income.response.type';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeService {
  constructor(
    @Inject(IncomeRepository)
    private readonly incomeRepository: IncomeRepository,
  ) {}

  async findAllIncome( paginationDto: PaginationIncomeDto): Promise<IncomeResponse> {
    return await this.incomeRepository.findAllIncomes(paginationDto);
  }

  create(createIncomeDto: CreateIncomeDto): Promise<Income> {
    return this.incomeRepository.createIncome(createIncomeDto);
  }

  updateIncome(id: string, updateIncomeDto: UpdateIncomeDto) {
    return this.incomeRepository.updateIncome(id, updateIncomeDto);
  }

  async removeIncome(id: string) {
    const income = await this.incomeRepository.findById(id);

    if (!income) {
      throw new NotFoundException(`ups income not found`);
    }
    return this.incomeRepository.removeIncome(id);
  }
}
