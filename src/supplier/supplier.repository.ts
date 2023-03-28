import { Injectable } from '@nestjs/common';
import { Item } from '../items/entities/items.entity';
import { Brackets, DataSource, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { PaginationSupplierDto } from './dto/pagination-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { SupplierResponse } from './types/supplier.response.type';

@Injectable()
export class SupplierRepository {
  private repository: Repository<Supplier>;
  private itemRepository: Repository<Item>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Supplier);
    this.itemRepository = this.dataSource.getRepository(Item);
  }

  async findAllSupplier(
    paginationDto: PaginationSupplierDto,
  ): Promise<SupplierResponse> {
    const qb = this.repository.createQueryBuilder('supplier')
      .leftJoinAndSelect('supplier.items', 'item')
    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            supplier.name, ' ', 
            supplier.address, ' ', 
            supplier.city, ' ', 
            supplier.phone_number, ' ', 
            supplier.account_number, ' ', 
            supplier.account_owner, ' ', 
            supplier.bank) ILike :keywords`, 
            { 
              keywords: `%${paginationDto.keywords}%` 
            });
        })
      );
    }
    if (paginationDto.orderBy === 'items') {
      qb.orderBy('item.brand', paginationDto.orderType)
    } else {
      qb.orderBy(`supplier.${paginationDto.orderBy}`, paginationDto.orderType)
    }
    qb.skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)
    
    const [data, total] = await qb.getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findSupplierById(id: string): Promise<Supplier> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findItemById(id: string): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
    });
  }

  async createSupplier(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    const { items, ...supplierData} = createSupplierDto
    const newItem = this.repository.create(supplierData);
    if (items) {
      const promises = items.map(async (itemDto) => {
        let item = await this.findItemById(itemDto.id);
        if (!item) {
          item = this.itemRepository.create(itemDto);
          await this.itemRepository.save(item);
        }
        return item;
      });
    }
    return this.repository.save(newItem);
  }

  async updateSupplier(id: string, updateSupplierDto: UpdateSupplierDto) {
    const newSupplier = await this.findSupplierById(id);
    if (!newSupplier) {
      throw new Error(`Supplier with id ${id} not found.`);
    }
    Object.assign(newSupplier, updateSupplierDto);
    await this.repository.save(newSupplier);
    return {
      message: 'Update Supplier Success',
    };
  }

  async removeSupplier(id: string) {
    await this.repository.delete(id);
    return {
      message: 'supplier berhasil dihapus',
    };
  }
}
