import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationCustomerDto } from './dto/pagination-customer.dto';
import { CustomerResponse } from './types/customer.response.type';
import { CustomerRepository } from './customer.repository';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {

  constructor(
    @Inject(CustomerRepository)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async findAllCustomer(
    paginationDto: PaginationCustomerDto,
  ): Promise<CustomerResponse> {
    return await this.customerRepository.findAllCustomer(paginationDto);
  }

  createCustomer(
    createCustomerDto: CreateCustomerDto
  ): Promise<Customer> {
    return this.customerRepository.createCustomer(createCustomerDto);
  }

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.updateCustomer(id, updateCustomerDto);
  }

  remove(id: string) {
    return this.customerRepository.removeCustomer(id);
  }
}
