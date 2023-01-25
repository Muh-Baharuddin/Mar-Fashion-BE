import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateBarangDto } from './dto/create-barang.dto';
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

  findById(id: string): Promise<Barang> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createBarang(createBarangDto: CreateBarangDto): Promise<Barang> {
    return this.repository.save(createBarangDto);
  }
}
