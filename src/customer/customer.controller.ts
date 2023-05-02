import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Query, UsePipes } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PaginationCustomerDto } from './dto/pagination-customer.dto';
import { CustomerResponse } from './types/customer.response.type';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAllCustomer(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationCustomerDto,
  ): Promise<CustomerResponse> {
    return this.customerService.findAllCustomer(paginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
