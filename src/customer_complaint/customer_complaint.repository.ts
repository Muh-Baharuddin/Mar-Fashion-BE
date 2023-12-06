import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CustomerComplaintResponse } from './types/customer_complaint-response';
import { CustomerComplaint } from './entities/customer_complaint.entity';
import { CreateComplaintDto } from './dto/create-customer_complaint.dto';
import { UpdateComplaintDto } from './dto/update-customer_complaint.dto';
import { PaginationComplaintDto } from './dto/pagination-complaint.dto';

@Injectable()
export class ComplaintRepository {
  private complaintRepository: Repository<CustomerComplaint>;

  constructor(private dataSource: DataSource) {
    this.complaintRepository = this.dataSource.getRepository(CustomerComplaint);
  }

  async findAllComplaint(
    paginationDto: PaginationComplaintDto,
  ): Promise<CustomerComplaintResponse> {
    const qb = this.complaintRepository.createQueryBuilder('customer_complaint');

    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(`CONCAT(
        customer_complaint.invoice, ' ', 
        customer_complaint.name, ' ', 
        customer_complaint.address, ' ', 
        customer_complaint.city, ' ', 
        customer_complaint.description) ILike :keywords`, 
        {
          keywords: `%${paginationDto.keywords}%` 
        }
      );
    }
    qb.orderBy(`customer_complaint.${paginationDto.orderBy}`, paginationDto.orderType)
    .skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
    };
  }

  findComplaintById(id: string): Promise<CustomerComplaint> {
    return this.complaintRepository.findOne({
      where: { id },
    });
  }

  async createComplaint(createComplaintDto: CreateComplaintDto): Promise<CustomerComplaint> {
    return this.complaintRepository.save(createComplaintDto);
  }

  async updateComplaint(id: string, updateComplaintDto: UpdateComplaintDto) {
    await this.complaintRepository.update(id, updateComplaintDto);
    return {
      message: 'Update Customer Compaint Success',
    };
  }

  async removeComplaint(id: string) {
    await this.complaintRepository.delete(id);
    return {
      message: 'Delete Customer Complaint Success',
    };
  }
}
