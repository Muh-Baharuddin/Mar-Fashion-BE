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
      .leftJoinAndSelect('purchase.items', 'items')
      .leftJoinAndSelect('purchase.supplier', 'supplier')

    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            purchase.invoice, ' ',
            purchase.date, ' ',
            purchase.items, ' ',
            purchase.unit, ' ',
            purchase.amount, ' ',
            purchase.total, ' ',
            purchase.supplier) ILike :keywords`,
            {
              keywords: `%${paginationDto.keywords}%` 
            })
        })
      )
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
    const { __items__, __supplier__, ...purchaseData } = createPurchaseDto;
    const newPurchase = this.repository.create(purchaseData);
    if (__supplier__) {
      const supplierExist = await this.findSupplierById(__supplier__.id);
      if (!supplierExist) {
        throw new Error(`Supplier with id ${__supplier__.id} not found.`);
      }
      newPurchase.supplier = Promise.resolve(__supplier__)
    }
    if (__items__) {
      const promises = __items__.map(async (itemDto) => {
        let itemExist = await this.findItemById(itemDto.id);
        if (!itemExist) {
          throw new Error(`Item with id ${itemDto.id} not found.`);
        }
        const item = await this.itemRepository.save(itemExist);
        return item;
      });
      const itemSale = await Promise.all(promises);
      newPurchase.items = Promise.resolve(itemSale);
    }
    return this.repository.save(newPurchase);
  }

  async updatePurchase(
    id: string,
    updatePurchaseDto: UpdatePurchaseDto,
  ) {
    const newPurchase = await this.findPurchaseById(id);
    if (!newPurchase) {
      throw new Error(`Purchase with id ${id} not found.`);
    }
    Object.assign(newPurchase, updatePurchaseDto);
    await this.repository.save(newPurchase);
    return {
      message: 'Update Purchase Success',
    };
  }

  async removeItem(id: string) {
    const newPurchase = await this.findPurchaseById(id);
    const itemDelete = 
    {
      "invoice": "99",
      "date": "2023-07-19",
      "unit": "PCS",
      "amount": 1,
      "total": "12",
      "debt": 0,
      "__supplier__": {},
      "__items__": [],
      "create_by": null,
      "update_by": null,
      "id": id,
      "created_at": "2023-07-25T14:49:07.708Z",
      "updated_at": "2023-07-25T14:49:07.708Z"
  }

    Object.assign(newPurchase, itemDelete);
    await this.repository.save(newPurchase);
  }

  async removePurchase(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Purchase Success',
    };
  }
}
