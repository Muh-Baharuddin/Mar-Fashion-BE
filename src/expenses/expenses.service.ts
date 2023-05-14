import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseRepository } from './expenses.repository';
import { PaginationExpenseDto } from './dto/pagination-expense.dto';
import { ExpenseResponse } from './types/expense.response.type';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject(ExpenseRepository)
    private readonly expenseRepository: ExpenseRepository,
  ) {}

  async findAllExpense( paginationDto: PaginationExpenseDto): Promise<ExpenseResponse> {
    return await this.expenseRepository.findAllExpenses(paginationDto);
  }

  create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseRepository.createExpense(createExpenseDto);
  }

  updateExpense(id: string, updateExpenseDto: UpdateExpenseDto) {
    return this.expenseRepository.updateExpense(id, updateExpenseDto);
  }

  async removeExpense(id: string) {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new NotFoundException(`ups expense not found`);
    }
    return this.expenseRepository.removeExpense(id);
  }
}
