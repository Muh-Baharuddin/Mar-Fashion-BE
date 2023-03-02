import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employees } from './entities/Employees.entity';

@Injectable()
export class EmployeeRepository {
  private repository: Repository<Employees>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Employees);
  }

  findAllEmployees(): Promise<Employees[]> {
    return this.repository.find();
  }

  findById(id_employee: string): Promise<Employees> {
    return this.repository.findOne({
      where: { id_employee },
    });
  }

  createEmployees(createEmployeeDto: CreateEmployeeDto): Promise<Employees> {
    return this.repository.save(createEmployeeDto);
  }

  async updateEmployees(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.repository.update(id, updateEmployeeDto);
    return {
      message: 'Update Empolyee Success',
    };
  }

  async removeEmployees(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Employee Success',
    };
  }
}
