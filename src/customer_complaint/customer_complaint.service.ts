import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-customer_complaint.dto';
import { UpdateComplaintDto } from './dto/update-customer_complaint.dto';
import { PaginationComplaintDto } from './dto/pagination-complaint.dto';
import { CustomerComplaintResponse } from './types/customer_complaint-response';
import { ComplaintRepository } from './customer_complaint.repository';

@Injectable()
export class CustomerComplaintService {

  constructor(
    @Inject(ComplaintRepository)
    private readonly complaintRepository: ComplaintRepository,
  ) {}

  async findAllComplaint(
    paginationDto: PaginationComplaintDto,
  ): Promise<CustomerComplaintResponse> {
    return await this.complaintRepository.findAllComplaint(paginationDto);
  }

  createComplaint(createComplaintDto: CreateComplaintDto) {
    return this.complaintRepository.createComplaint(createComplaintDto)
  }

  updateComplaint(id: string, updateComplaintDto: UpdateComplaintDto) {
    return this.complaintRepository.updateComplaint(id, updateComplaintDto)
  }

  async removeComplaint(id: string) {
    const complaint = await this.complaintRepository.findComplaintById(id)
    
    if (!complaint) {
      throw new NotFoundException(`ups complaint not found`);
    }
    return this.complaintRepository.removeComplaint(id)
  }
}
