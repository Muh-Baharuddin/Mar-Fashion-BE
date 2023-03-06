import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { PaginationSupplierDto } from './dto/pagination-supplier.dto';
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
    let where: FindOptionsWhere<Supplier>[];
    if (paginationDto.keywords) {
      where = [
        { name :  ILike(`%${paginationDto.keywords}%`)},
        { address: ILike(`%${paginationDto.keywords}%`)},
        { city: ILike(`%${paginationDto.keywords}%`)},
        { phone_number: ILike(`%${paginationDto.keywords}%`)},
        { account_number: ILike(`%${paginationDto.keywords}%`)},
        { account_owner: ILike(`%${paginationDto.keywords}%`)},
        { bank: ILike(`%${paginationDto.keywords}%`)},
      ] 
    }
    const [data, total] = await this.repository.findAndCount({
      where,
      order: {
        [paginationDto.orderBy]: paginationDto.orderType,
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
