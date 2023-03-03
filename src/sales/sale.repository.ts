import { Injectable } from '@nestjs/common';
import { Between, DataSource, Equal, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { SaleResponse } from './types/Sale.response.type';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SaleRepository {
  private repository: Repository<Sale>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Sale);
  }
  async findAllSale(paginationSaleDto: PaginationSaleDto): Promise<SaleResponse> {
    const queryBuilder = this.repository.createQueryBuilder('Sale');
    console.log(paginationSaleDto.page)
    
    if (paginationSaleDto.keywords) {
      queryBuilder.where(`Sale.barang ILIKE '%${paginationSaleDto.keywords}%'`)
                  .orWhere(`Sale.total_harga = ${paginationSaleDto.keywords}`)
                  .orWhere(`Sale.jumlah_barang = ${paginationSaleDto.keywords}`)
                  .orWhere(`Sale.tanggal BETWEEN '${paginationSaleDto.keywords}' AND '${paginationSaleDto.keywords} 23:59:59'`);

      // if (typeof paginationSaleDto.keywords === 'string') {
      //   queryBuilder.where(`Sale.barang ILIKE '%${paginationSaleDto.keywords}%'`)
      //     .orWhere(`Sale.total_harga = ${paginationSaleDto.keywords}`)
      //     .orWhere(`Sale.jumlah_barang = ${paginationSaleDto.keywords}`)
      //     .orWhere(`Sale.tanggal BETWEEN '${paginationSaleDto.keywords}' AND '${paginationSaleDto.keywords} 23:59:59'`);
      // } else if (typeof paginationSaleDto.keywords === 'number') {
      //   queryBuilder.where(`Sale.total_harga = ${paginationSaleDto.keywords}`)
      //     .orWhere(`Sale.jumlah_barang = ${paginationSaleDto.keywords}`);
      // } else if (paginationSaleDto.keywords instanceof Date) {
      //   const startDate = new Date(paginationSaleDto.keywords);
      //   const endDate = new Date(paginationSaleDto.keywords);
      //   endDate.setHours(23, 59, 59, 999);
      //   queryBuilder.where(`Sale.tanggal BETWEEN :startDate AND :endDate`, { startDate, endDate });
      // }
    }
  
    const [data, total] = await queryBuilder
      // .orderBy(`Sale.${paginationSaleDto.orderBy}`, paginationSaleDto.orderType)
      .skip((paginationSaleDto.page - 1) * paginationSaleDto.limit)
      .take(paginationSaleDto.limit)
      .getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  async findById(id: string): Promise<Sale> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createSale(
    createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    return this.repository.save(createSaleDto);
  }

  async updateSale(
    id: string,
    updateSaleDto: UpdateSaleDto,
  ) {
    await this.repository.update(id, updateSaleDto);
    return {
      message: 'Update Sale Success',
    };
  }

  async removeSale(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Sale Success'
    }
  }
}
