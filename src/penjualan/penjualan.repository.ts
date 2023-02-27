import { Injectable } from '@nestjs/common';
import { Between, DataSource, Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { PaginationPenjualanDto } from './dto/pagination-penjualan.dto';
import { PenjualanResponse } from './types/penjualan.response.type';
import { Penjualan } from './entities/penjualan.entity';

@Injectable()
export class PenjualanRepository {
  private repository: Repository<Penjualan>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Penjualan);
  }

  async findAllPenjualan(
    paginationPenjualanDto: PaginationPenjualanDto,
  ): Promise<PenjualanResponse> {
    let where: FindOptionsWhere<Penjualan>[];
    if (paginationPenjualanDto.keywords) {
      where = [
        { tanggal: Between(new Date(paginationPenjualanDto.keywords), new Date(paginationPenjualanDto.keywords + ' 23:59:59'))},
        { barang: ILike(`%${paginationPenjualanDto.keywords}%`)},
        { jumlah_barang: Equal(Number(paginationPenjualanDto.keywords))},
        { total_harga: Equal(Number(paginationPenjualanDto.keywords))},
      ] 
    }
    const [data, total] = await this.repository.findAndCount({
      where,
      order: {
        [paginationPenjualanDto.orderBy]: paginationPenjualanDto.orderType,
      },
      skip: (paginationPenjualanDto.page - 1) * paginationPenjualanDto.limit,
      take: paginationPenjualanDto.limit,
    });
    return {
      data,
      total,
    };
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
