import { PartialType } from '@nestjs/mapped-types';
import { CreateStoreLocationDto } from './create-store-location.dto';

export class UpdateStoreLocationDto extends PartialType(CreateStoreLocationDto) {}
