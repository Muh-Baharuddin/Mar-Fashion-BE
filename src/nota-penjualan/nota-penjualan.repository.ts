import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { NotaPenjualan } from './entities/nota-penjualan.entity';

@Injectable()
export class NotaPenjualanRepository {
  private repository: Repository<NotaPenjualan>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(NotaPenjualan);
  }

  findAllNotaPenjualan(): Promise<NotaPenjualan[]> {
    return this.repository.find();
  }
}