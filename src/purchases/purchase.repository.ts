import { Injectable } from '@nestjs/common';
import { Item } from '../items/entities/items.entity';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PaginationPurchaseDto } from './dto/pagination-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseResponse } from './types/purchase.response.type';

@Injectable()
export class PurchaseRepository {
  private repository: Repository<Purchase>;
  private itemRepository: Repository<Item>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Purchase);
    this.itemRepository = this.dataSource.getRepository(Item);
  }

  async findAllPurchase(
    paginationDto: PaginationPurchaseDto,
  ): Promise<PurchaseResponse> {
    const qb = this.repository.createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.items', 'item')

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

  async createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    const { items, unit, cost, ...purchaseData } = createPurchaseDto;
    const newItem = this.repository.create(purchaseData);
    if (items) {
      const promises = items.map(async (itemData, index) => {
        let item = await this.findItemById(itemData.id);
        if (!item) {
          item = this.itemRepository.create(itemData);
          await this.itemRepository.save(item);
        }
        return item;
      });
      const purchaseItem = await Promise.all(promises);
      newItem.items = Promise.resolve(purchaseItem);
    }
    return this.repository.save(newItem);
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
