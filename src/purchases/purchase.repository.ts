import { Injectable } from '@nestjs/common';
import { Item } from '../items/entities/items.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PaginationPurchaseDto } from './dto/pagination-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseResponse } from './types/purchase.response.type';
import { Supplier } from '../supplier/entities/supplier.entity';

@Injectable()
export class PurchaseRepository {
  private repository: Repository<Purchase>;
  private itemRepository: Repository<Item>;
  private supplierRepository: Repository<Supplier>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Purchase);
    this.itemRepository = this.dataSource.getRepository(Item);
    this.supplierRepository = this.dataSource.getRepository(Supplier);
  }

  async findAllPurchase(
    paginationDto: PaginationPurchaseDto,
  ): Promise<PurchaseResponse> {
    const qb = this.repository.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.item', 'item')
      .leftJoinAndSelect('purchase.supplier', 'supplier')

    if (paginationDto.keywords) {
      qb.andWhere(new Brackets(qb => {
        qb.where('purchase.date::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` })
          .orWhere('purchase.unit::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` })
          .orWhere('purchase.cost::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` });
      }));
    }

    const [data, total] = await qb
      .orderBy(`purchase.${paginationDto.orderBy}`, paginationDto.orderType)
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .take(paginationDto.limit)
      .getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findPurchaseById(id: string): Promise<Purchase> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findItemById(id: string): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
    });
  }

  findSupplierById(id: string): Promise<Supplier> {
    return this.supplierRepository.findOne({
      where: { id },
    });
  }

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const { item, supplier, ...purchaseData } = createPurchaseDto;
    const newPurchase = this.repository.create(purchaseData);
    if (supplier) {
      const supplierExist = await this.findSupplierById(supplier.id);
      if (!supplierExist) {
        throw new Error(`Supplier with id ${supplier.id} not found.`);
      }
      newPurchase.supplier = Promise.resolve(supplier)
    }
    if (item) {
      const itemExist = await this.findItemById(item.id);
      if (!itemExist) {
        throw new Error(`Item with id ${item.id} not found.`);
      }
      newPurchase.item = Promise.resolve(item)
    }
    return this.repository.save(newPurchase);
  }

  // async updatePurchase(
  //   id: string,
  //   updatePurchaseDto: UpdatePurchaseDto,
  // ) {
  //   await this.repository.update(id, updatePurchaseDto);
  //   return {
  //     message: 'Update Purchase Success',
  //   };
  // }

  async removePurchase(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Purchase Success',
    };
  }
}
