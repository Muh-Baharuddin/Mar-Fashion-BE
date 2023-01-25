import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateNotaPembelianDto } from './dto/create-nota-pembelian.dto';
import { NotaPembelian } from './entities/nota-pembelian.entity';

@Injectable()
export class NotaPembelianRepository {
  private repository: Repository<NotaPembelian>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(NotaPembelian);
  }

  findAllNotaPembelian(): Promise<NotaPembelian[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<NotaPembelian> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createPembelian(
    createNotaPembelianDto: CreateNotaPembelianDto,
  ): Promise<NotaPembelian> {
    return this.repository.save(createNotaPembelianDto);
  }
}
