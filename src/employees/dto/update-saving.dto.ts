import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeSavingDto } from './create-saving.dto';

export class UpdateEmployeeSavingDto extends PartialType(CreateEmployeeSavingDto) {}
