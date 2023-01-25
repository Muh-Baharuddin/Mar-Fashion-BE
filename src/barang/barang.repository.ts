import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Barang } from './entities/barang.entity';

@Injectable()
export class BarangRepository {
  private repository: Repository<Barang>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Barang);
  }

  findAllBarang(): Promise<Barang[]> {
    return this.repository.find();
  }
}
