import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationCustomerDto } from './dto/pagination-customer.dto';
import { CustomerResponse } from './types/customer.response.type';

@Injectable()
export class CustomerRepository {
  private customerRepository: Repository<Customer>;

  constructor(private dataSource: DataSource) {
    this.customerRepository = this.dataSource.getRepository(Customer);
  }

  async findAllCustomer(
    paginationDto: PaginationCustomerDto,
  ): Promise<CustomerResponse> {
    const qb = this.customerRepository.createQueryBuilder('customer')
    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            customer.name, ' ', 
            customer.address, ' ', 
            customer.city, ' ', 
            customer.phone_number) ILike :keywords`, 
            { 
              keywords: `%${paginationDto.keywords}%` 
            });
        })
      );
    }
    qb.orderBy(`customer.${paginationDto.orderBy}`, paginationDto.orderType)
    .skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)
    
    const [data, total] = await qb.getManyAndCount();
  
    return {
      data,
      total,
    };
  }

  findCustomerById(id: string): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { id },
    });
  }

  createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.save(createCustomerDto);
  }

  async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.update(id, updateCustomerDto);
    return {
      message: "Update Customer Success"
    }
  }

  async removeCustomer(id: string) {
    await this.customerRepository.delete(id);
    return {
      message: 'Delete Customer Success',
    };
  }
}
