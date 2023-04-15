import { Module } from '@nestjs/common';
import { CustomerComplaintService } from './customer_complaint.service';
import { CustomerComplaintController } from './customer_complaint.controller';

@Module({
  controllers: [CustomerComplaintController],
  providers: [CustomerComplaintService]
})
export class CustomerComplaintModule {}
