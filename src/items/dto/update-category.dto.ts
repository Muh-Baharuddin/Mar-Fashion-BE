import { PartialType } from '@nestjs/mapped-types';
import { CategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CategoryDto) {}
