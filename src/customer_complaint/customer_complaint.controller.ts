import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerComplaintService } from './customer_complaint.service';
import { CreateCustomerComplaintDto } from './dto/create-customer_complaint.dto';
import { UpdateCustomerComplaintDto } from './dto/update-customer_complaint.dto';

@Controller('customer-complaint')
export class CustomerComplaintController {
  constructor(private readonly customerComplaintService: CustomerComplaintService) {}

  @Post()
  create(@Body() createCustomerComplaintDto: CreateCustomerComplaintDto) {
    return this.customerComplaintService.create(createCustomerComplaintDto);
  }

  @Get()
  findAll() {
    return this.customerComplaintService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerComplaintService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerComplaintDto: UpdateCustomerComplaintDto) {
    return this.customerComplaintService.update(+id, updateCustomerComplaintDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerComplaintService.remove(+id);
  }
}
