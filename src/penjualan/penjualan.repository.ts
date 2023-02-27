import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { Penjualan } from './entities/penjualan.entity';

@Injectable()
export class PenjualanRepository {
  private repository: Repository<Penjualan>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Penjualan);
  }

  findAllPenjualan(): Promise<Penjualan[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Penjualan> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createPenjualan(
    createPenjualanDto: CreatePenjualanDto,
  ): Promise<Penjualan> {
    return this.repository.save(createPenjualanDto);
  }

  async updatePenjualan(
    id: string,
    updatePenjualanDto: UpdatePenjualanDto,
  ) {
    await this.repository.update(id, updatePenjualanDto);
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
