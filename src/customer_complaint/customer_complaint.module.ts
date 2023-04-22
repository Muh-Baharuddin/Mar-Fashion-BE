import { Module } from '@nestjs/common';
import { CustomerComplaintService } from './customer_complaint.service';
import { CustomerComplaintController } from './customer_complaint.controller';
import { CustomerComplaint } from './entities/customer_complaint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintRepository } from './customer_complaint.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerComplaint])],
  controllers: [CustomerComplaintController],
  providers: [CustomerComplaintService, ComplaintRepository]
})
export class CustomerComplaintModule {}
