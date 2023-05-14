import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { PaginationExpenseDto } from './dto/pagination-expense.dto';
import { ExpenseResponse } from './types/expense.response.type';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  async findAllExpense(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationExpenseDto,
  ): Promise<ExpenseResponse> {
    return this.expensesService.findAllExpense(paginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.updateExpense(id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.expensesService.removeExpense(id);
  }
}
