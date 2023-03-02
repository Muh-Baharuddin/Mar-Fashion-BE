import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Karyawan } from './entities/karyawan.entity';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @Inject(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async findAllKaryawan(): Promise<Karyawan[]> {
    const employee = await this.employeeRepository.findAllKaryawan();

    if (!employee.length) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return employee;
  }

  async findById(id: string): Promise<Karyawan> {
    const karyawan = await this.employeeRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return karyawan;
  }

  createKaryawan(createEmployeeDto: CreateEmployeeDto): Promise<Karyawan> {
    return this.employeeRepository.createKaryawan(createEmployeeDto);
  }

  async updateKaryawan(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const karyawan = await this.employeeRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return this.employeeRepository.updateKaryawan(id, updateEmployeeDto);
  }

  async removeKaryawan(id: string) {
    const karyawan = await this.employeeRepository.findById(id);

    if (!karyawan) {
      throw new NotFoundException(`ups karyawan not found`);
      this.logger.warn(`karyawan tidak ketemu`);
    }
    return this.employeeRepository.removeKaryawan(id);
  }
}
