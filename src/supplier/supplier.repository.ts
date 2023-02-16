import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
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
    page: number,
    limit: number,
  ): Promise<SupplierResponse> {
    const [data, total] = await this.repository.findAndCount({
      order: {
        nama: 'ASC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      dataSupplier: data,
      total,
      currentPage: page,
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
