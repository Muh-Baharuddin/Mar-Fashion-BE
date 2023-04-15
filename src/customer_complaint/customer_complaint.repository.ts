import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CustomerComplaintResponse } from './types/customer_complaint-response';
import { CustomerComplaint } from './entities/customer_complaint.entity';
import { CreateComplaintDto } from './dto/create-customer_complaint.dto';

@Injectable()
export class ComplaintRepository {
  private complaintRepository: Repository<CustomerComplaint>;

  constructor(private dataSource: DataSource) {
    this.complaintRepository = this.dataSource.getRepository(CustomerComplaint);
  }

  async createComplaint(createComplaintDto: CreateComplaintDto): Promise<CustomerComplaint> {
    return this.complaintRepository.save(createComplaintDto);
  }
}
