import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerComplaintDto } from './create-customer_complaint.dto';

export class UpdateCustomerComplaintDto extends PartialType(CreateCustomerComplaintDto) {}
