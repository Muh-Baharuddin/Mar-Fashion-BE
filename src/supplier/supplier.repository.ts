import { Injectable } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import {
  CreateSupplierDto,
  PaginationSupplierDto,
} from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { SupplierResponse } from './types/supplier.response.type';

@Injectable()
export class SupplierRepository {
  private repository: Repository<Supplier>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Supplier);
  }

  async findAllSupplier(
    paginationDto: PaginationSupplierDto,
  ): Promise<SupplierResponse> {
    const where: any = {};
    if (paginationDto.nama) {
      where.nama = ILike(`%${paginationDto.nama}%`);
    }
    const [data, total] = await this.repository.findAndCount({
      where,
      // where: {
      //   nama: ILike(`%${paginationDto.nama}%`)
      // },
      order: {
        nama: paginationDto.order,
      },
      skip: (paginationDto.page - 1) * paginationDto.limit,
      take: paginationDto.limit,
    });
    return {
      data,
      total,
    };
  }

  findById(id: string): Promise<Supplier> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createSupplier(
    CreateCreateSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return this.repository.save(CreateCreateSupplierDto);
  }

  async updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto) {
    await this.repository.update(id, updateSupplierDto);
    return {
      message: 'supplier berhasil diupdate',
    };
  }

  async removeSupplier(id: string) {
    await this.repository.delete(id);
    return {
      message: 'supplier berhasil dihapus',
    };
  }
}
