import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { SaleResponse } from './types/sale.response.type';
import { Sale } from './entities/sale.entity';
import { Item } from '../items/entities/items.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class SaleRepository {
  private saleRepository: Repository<Sale>;
  private itemRepository: Repository<Item>;
  private customerRepository: Repository<Customer>;

  constructor(private dataSource: DataSource) {
    this.saleRepository = this.dataSource.getRepository(Sale);
    this.itemRepository = this.dataSource.getRepository(Item);
    this.customerRepository = this.dataSource.getRepository(Customer);
  }
  async findAllSale(paginationSaleDto: PaginationSaleDto): Promise<SaleResponse> {
    const qb = this.saleRepository.createQueryBuilder('sale')
      .leftJoinAndSelect('sale.item', 'item');
    
    if (paginationSaleDto.keywords) {
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            sale.invoice, ' ',
            sale.date, ' ',
            sale.customer, ' ',
            sale.item, ' ',
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

  findCustomerById(id: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { id },
    });
  }

  createSale(
    createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    const { item, customer, ...saleData} = createSaleDto;
    const newSale = this.saleRepository.create(saleData);
    if (customer) {
      const customerExist = this.findCustomerById(customer.id);
      if (!customerExist) {
        throw new Error(`Customer with id ${customer.id} not found.`);
      }
      newSale.customer = Promise.resolve(customer)
    }
    if (item) {
      const itemExist = this.findItemById(item.id);
      if (!itemExist) {
        throw new Error(`Item with id ${item.id} not found.`);
      }
      newSale.item = Promise.resolve(item)
    }
    return this.saleRepository.save(newSale);
  }

  // async updateSale(
  //   id: string,
  //   updateSaleDto: UpdateSaleDto,
  // ) {
  //   await this.saleRepository.update(id, updateSaleDto);
  //   return {
  //     message: 'Update Sale Success',
  //   };
  // }

  async removeSale(id: string) {
    await this.saleRepository.delete(id);
    return {
      message: 'Delete Sale Success'
    }
  }
}
