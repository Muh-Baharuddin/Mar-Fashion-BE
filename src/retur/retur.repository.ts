import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Retur } from './entities/retur.entity';


@Injectable()
export class ReturRepository {
  private repository: Repository<Retur>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Retur);
  }

  findAllRetur(): Promise<Retur[]> {
    return this.repository.find();
  }
}