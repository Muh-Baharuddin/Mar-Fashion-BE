import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SupplierRepository {
  private repository: Repository<Supplier>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Supplier);
  }

  findAllSupplier(): Promise<Supplier[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Supplier> {
    return this.repository.findOne({
      where: { id },
    });
  }
}