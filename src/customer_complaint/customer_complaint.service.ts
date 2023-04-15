import { Injectable } from '@nestjs/common';
import { CreateCustomerComplaintDto } from './dto/create-customer_complaint.dto';
import { UpdateCustomerComplaintDto } from './dto/update-customer_complaint.dto';

@Injectable()
export class CustomerComplaintService {
  create(createCustomerComplaintDto: CreateCustomerComplaintDto) {
    return 'This action adds a new customerComplaint';
  }

  findAll() {
    return `This action returns all customerComplaint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerComplaint`;
  }

  update(id: number, updateCustomerComplaintDto: UpdateCustomerComplaintDto) {
    return `This action updates a #${id} customerComplaint`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerComplaint`;
  }
}
