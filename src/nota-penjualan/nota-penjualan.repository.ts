import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateNotaPenjualanDto } from './dto/create-nota-penjualan.dto';
import { UpdateNotaPenjualanDto } from './dto/update-nota-penjualan.dto';
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

  async findById(id: string): Promise<NotaPenjualan> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createPenjualan(
    createNotaPenjualanDto: CreateNotaPenjualanDto,
  ): Promise<NotaPenjualan> {
    return this.repository.save(createNotaPenjualanDto);
  }

  async updatePenjualan(
    id: string,
    updateNotaPenjualanDto: UpdateNotaPenjualanDto,
  ) {
    await this.repository.update(id, updateNotaPenjualanDto);
    return {
      message: 'nota pembelian berhasil diupdate',
    };
  }

  async removePenjualan(id: string) {
    await this.repository.delete(id);
    return {
      message: 'nota penjualan berhasil dihapus'
    }
  }
}
