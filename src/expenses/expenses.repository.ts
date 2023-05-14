import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { PaginationExpenseDto } from './dto/pagination-expense.dto';
import { ExpenseResponse } from './types/expense.response.type';

@Injectable()
export class ExpenseRepository {
  private repository: Repository<Expense>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Expense);
  }

  async findAllExpenses(paginationDto: PaginationExpenseDto): Promise<ExpenseResponse> {
    const qb = this.repository.createQueryBuilder('expense');
    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            expense.date, ' ',
            expense.total, ' ',
            expense.description) ILike :keywords`,
            {
              keywords: `%${paginationDto.keywords}%` 
            })
        })
      )
    }
    const [data, total] = await qb
      .orderBy(`expense.${paginationDto.orderBy}`, paginationDto.orderType)
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .take(paginationDto.limit)
      .getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findById(id: string): Promise<Expense> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.repository.save(createExpenseDto);
  }

  async updateExpense(id: string, updateExpenseDto: UpdateExpenseDto) {
    await this.repository.update(id, updateExpenseDto);
    return {
      message: 'Update Expense Success',
    };
  }

  async removeExpense(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Expense Success',
    };
  }
}
