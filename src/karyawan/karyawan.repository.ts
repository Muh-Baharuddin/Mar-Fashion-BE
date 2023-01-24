import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Karyawan } from './entities/karyawan.entity';

@Injectable()
export class KaryawanRepository {
  private repository: Repository<Karyawan>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Karyawan);
  }

  findAllKaryawan(): Promise<Karyawan[]> {
    return this.repository.find();
  }
}