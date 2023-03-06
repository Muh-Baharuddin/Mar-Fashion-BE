import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeRepository {
  private repository: Repository<Employee>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Employee);
  }

  findAllEmployees(): Promise<Employee[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Employee> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createEmployees(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
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
