import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
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

  findById(id: string): Promise<Retur> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createRetur(createReturDto: CreateReturDto): Promise<Retur> {
    return this.repository.save(createReturDto);
  }

  async updateRetur(id: string, updateReturDto: UpdateReturDto) {
    await this.repository.update(id, updateReturDto);
    return {
      message: 'retur berhasil diupdate',
    };
  }

  async removeRetur(id: string) {
    await this.repository.delete(id);
    return {
      message: 'retur berhasil dihapus',
    };
  }
}