import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateBarangDto } from './dto/create-item.dto';
import { UpdateBarangDto } from './dto/update-item.dto';
import { Barang } from './entities/items.entity';

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

  async updateBarang(id: string, updateBarangDto: UpdateBarangDto) {
    await this.repository.update(id, updateBarangDto);
    return {
      message: 'barang berhasil diupdate',
    };
  }

  async removeBarang(id: string) {
    await this.repository.delete(id);
    return {
      message: 'barang berhasil dihapus',
    };
  }
}
