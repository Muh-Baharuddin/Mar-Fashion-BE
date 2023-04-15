import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintDto } from './create-customer_complaint.dto';

export class UpdateComplaintDto extends PartialType(CreateComplaintDto) {}
