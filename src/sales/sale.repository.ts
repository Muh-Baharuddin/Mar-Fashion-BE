import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { SaleResponse } from './types/sale.response.type';
import { Sale } from './entities/sale.entity';
import { Item } from '../items/entities/items.entity';

@Injectable()
export class SaleRepository {
  private saleRepository: Repository<Sale>;
  private itemRepository: Repository<Item>;

  constructor(private dataSource: DataSource) {
    this.saleRepository = this.dataSource.getRepository(Sale);
    this.itemRepository = this.dataSource.getRepository(Item);
  }

  async findAllSale(paginationSaleDto: PaginationSaleDto): Promise<SaleResponse> {
    const qb = this.saleRepository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.items', 'items');
    
    if (paginationSaleDto.keywords) {
      paginationSaleDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            sale.invoice, ' ',
            sale.date, ' ',
            sale.customer, ' ',
            sale.items, ' ',
            sale.unit, ' ',
            sale.amount, ' ',
            sale.total) ILike :keywords`,
            {
              keywords: `%${paginationSaleDto.keywords}%` 
            })
        })
      )
    }
    const [data, total] = await qb
      .orderBy(`sale.${paginationSaleDto.orderBy}`, paginationSaleDto.orderType)
      .skip((paginationSaleDto.page - 1) * paginationSaleDto.limit)
      .take(paginationSaleDto.limit)
      .getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findSaleById(id: string): Promise<Sale> {
    return this.saleRepository.findOne({
      where: { id },
    });
  }

  findItemById(id: string): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
    });
  }

  async createSale(
    createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    const { items, ...saleData} = createSaleDto;
    const newSale = this.saleRepository.create(saleData);
    console.log(items)
    if (items) {
      const promises = items.map(async (itemDto) => {
        let itemExist = await this.findItemById(itemDto.id);
        if (!itemExist) {
          throw new Error(`Item with id ${itemDto.id} not found.`);
        }
        if (newSale.unit === "PCS") {
          newSale.amount *= 1;
          if (itemExist.stock < newSale.amount) {
            throw new Error(`Stock item ${itemExist.brand} is not enough to continue the transactions`);
          }
          itemExist.stock -= newSale.amount;
        }
        if (newSale.unit === "LUSIN") {
          newSale.amount *= 12;
          if (itemExist.stock < newSale.amount) {
            throw new Error(`Stock item ${itemExist.brand} is not enough to continue the transactions`);
          }
          itemExist.stock -= newSale.amount;
        }
        if (newSale.unit === "KODI") {
          newSale.amount *= 20;
          if (itemExist.stock < newSale.amount) {
            throw new Error(`Stock item ${itemExist.brand} is not enough to continue the transactions`);
          }
          itemExist.stock -= newSale.amount;
        }
        return itemExist;
      });
      const itemSale = await Promise.all(promises);
      newSale.items = Promise.resolve(itemSale);
    }
    return this.saleRepository.save(newSale);
  }

  async updateSale(
    id: string,
    updateSaleDto: UpdateSaleDto,
  ) {
    const newSale = await this.findSaleById(id);
    if (!newSale) {
      throw new Error(`Sale with id ${id} not found.`);
    }
    Object.assign(newSale, updateSaleDto);
    await this.saleRepository.save(newSale);
    return {
      message: 'Update Sale Success',
    };
  }

  async removeSale(id: string) {
    await this.saleRepository.delete(id);
    return {
      message: 'Delete Sale Success'
    }
  }
}
