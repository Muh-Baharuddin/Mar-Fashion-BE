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
    const { __items__, ...saleData} = createSaleDto;
    const newSale = this.saleRepository.create(saleData);
    if (__items__) {
      const promises = __items__.map(async (itemDto) => {
        let itemExist = await this.findItemById(itemDto.id);
        if (!itemExist) {
          throw new Error(`Item with id ${itemDto.id} not found.`);
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

  async removeItem(id: string) {
    const newSale = await this.findSaleById(id);
    const itemDelete = 
    {
      "invoice": "99",
      "date": "2023-07-19",
      "customer": "",
      "unit": "PCS",
      "amount": 1,
      "total": "12",
      "__items__": [],
      "create_by": null,
      "update_by": null,
      "id": id,
      "created_at": "2023-07-25T14:49:07.708Z",
      "updated_at": "2023-07-25T14:49:07.708Z"
  }

    Object.assign(newSale, itemDelete);
    await this.saleRepository.save(newSale);
  }

  async removeSale(id: string) {
    await this.saleRepository.delete(id);
    return {
      message: 'Delete Sale Success'
    }
  }
}
