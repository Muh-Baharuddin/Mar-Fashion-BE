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
  async findAllPenjualan(paginationPenjualanDto: PaginationPenjualanDto): Promise<PenjualanResponse> {
    const queryBuilder = this.repository.createQueryBuilder('penjualan');
    console.log(paginationPenjualanDto.page)
    
    if (paginationPenjualanDto.keywords) {
      queryBuilder.where(`penjualan.barang ILIKE '%${paginationPenjualanDto.keywords}%'`)
                  .orWhere(`penjualan.total_harga = ${paginationPenjualanDto.keywords}`)
                  .orWhere(`penjualan.jumlah_barang = ${paginationPenjualanDto.keywords}`)
                  .orWhere(`penjualan.tanggal BETWEEN '${paginationPenjualanDto.keywords}' AND '${paginationPenjualanDto.keywords} 23:59:59'`);

      // if (typeof paginationPenjualanDto.keywords === 'string') {
      //   queryBuilder.where(`penjualan.barang ILIKE '%${paginationPenjualanDto.keywords}%'`)
      //     .orWhere(`penjualan.total_harga = ${paginationPenjualanDto.keywords}`)
      //     .orWhere(`penjualan.jumlah_barang = ${paginationPenjualanDto.keywords}`)
      //     .orWhere(`penjualan.tanggal BETWEEN '${paginationPenjualanDto.keywords}' AND '${paginationPenjualanDto.keywords} 23:59:59'`);
      // } else if (typeof paginationPenjualanDto.keywords === 'number') {
      //   queryBuilder.where(`penjualan.total_harga = ${paginationPenjualanDto.keywords}`)
      //     .orWhere(`penjualan.jumlah_barang = ${paginationPenjualanDto.keywords}`);
      // } else if (paginationPenjualanDto.keywords instanceof Date) {
      //   const startDate = new Date(paginationPenjualanDto.keywords);
      //   const endDate = new Date(paginationPenjualanDto.keywords);
      //   endDate.setHours(23, 59, 59, 999);
      //   queryBuilder.where(`penjualan.tanggal BETWEEN :startDate AND :endDate`, { startDate, endDate });
      // }
    }
  
    const [data, total] = await queryBuilder
      // .orderBy(`penjualan.${paginationPenjualanDto.orderBy}`, paginationPenjualanDto.orderType)
      .skip((paginationPenjualanDto.page - 1) * paginationPenjualanDto.limit)
      .take(paginationPenjualanDto.limit)
      .getManyAndCount();
  
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
