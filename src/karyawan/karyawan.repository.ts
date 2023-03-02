import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateKaryawanDto } from './dto/create-karyawan.dto';
import { UpdateKaryawanDto } from './dto/update-karyawan.dto';
import { Karyawan } from './entities/employees.entity';

@Injectable()
export class KaryawanRepository {
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

  createKaryawan(createKaryawanDto: CreateKaryawanDto): Promise<Karyawan> {
    return this.repository.save(createKaryawanDto);
  }

  async updateKaryawan(id: string, updateKaryawanDto: UpdateKaryawanDto) {
    await this.repository.update(id, updateKaryawanDto);
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
