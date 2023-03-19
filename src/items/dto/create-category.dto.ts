import { IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty({ message: 'category name cannot be empty' })
  name: string;
}