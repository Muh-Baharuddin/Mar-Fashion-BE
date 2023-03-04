import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Income } from './entities/income.entity';

@Injectable()
export class IncomeRepository {
  private repository: Repository<Income>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Income);
  }

  findAllIncomes(): Promise<Income[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Income> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createEmployees(createIncomeDto: CreateIncomeDto): Promise<Income> {
    return this.repository.save(createIncomeDto);
  }

  async updateEmployees(id: string, updateIncomeDto: UpdateIncomeDto) {
    await this.repository.update(id, updateIncomeDto);
    return {
      message: 'Update Income Success',
    };
  }

  async removeEmployees(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Income Success',
    };
  }
}
