import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';
import { PaginationIncomeDto } from './dto/pagination-income.dto';
import { IncomeResponse } from './types/income.response.type';

@Injectable()
export class IncomeRepository {
  private repository: Repository<Income>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Income);
  }

  async findAllIncomes(paginationIncomeDto: PaginationIncomeDto): Promise<IncomeResponse> {
    const qb = this.repository.createQueryBuilder('income');
    if (paginationIncomeDto.keywords) {
      paginationIncomeDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            income.date, ' ',
            income.total, ' ',
            income.description) ILike :keywords`,
            {
              keywords: `%${paginationIncomeDto.keywords}%` 
            })
        })
      )
    }
    const [data, total] = await qb
      .orderBy(`income.${paginationIncomeDto.orderBy}`, paginationIncomeDto.orderType)
      .skip((paginationIncomeDto.page - 1) * paginationIncomeDto.limit)
      .take(paginationIncomeDto.limit)
      .getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findById(id: string): Promise<Income> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createIncome(createIncomeDto: CreateIncomeDto): Promise<Income> {
    return this.repository.save(createIncomeDto);
  }

  async updateIncome(id: string, updateIncomeDto: UpdateIncomeDto) {
    await this.repository.update(id, updateIncomeDto);
    return {
      message: 'Update Income Success',
    };
  }

  async removeIncome(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Income Success',
    };
  }
}
