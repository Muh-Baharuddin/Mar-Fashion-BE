import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Karyawan } from './entities/karyawan.entity';

@Injectable()
export class EmployeeRepository {
  private repository: Repository<Karyawan>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Karyawan);
  }

  findAllKaryawan(): Promise<Karyawan[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Karyawan> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createKaryawan(createEmployeeDto: CreateEmployeeDto): Promise<Karyawan> {
    return this.repository.save(createEmployeeDto);
  }

  async updateKaryawan(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    await this.repository.update(id, updateEmployeeDto);
    return {
      message: 'karyawan berhasil diupdate',
    };
  }

  async removeKaryawan(id: string) {
    await this.repository.delete(id);
    return {
      message: 'karyawan berhasil dihapus',
    };
  }
}
