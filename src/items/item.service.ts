import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/items.entity';
import { PaginationItemDto } from './dto/pagination-item.dto';
import { ItemResponse } from './types/item.response.type';
import { Category } from './entities/category.entity';
import { CategoryResponse } from './types/category.response.type';
import { PaginationCategoryDto } from './dto/pagination-category.dto';
import { CategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async findAllItems(
    paginationDto: PaginationItemDto,
  ): Promise<ItemResponse> {
    return await this.itemRepository.findAllItems(paginationDto);
  }

  async findAllCategory(
    paginationDto: PaginationCategoryDto,
  ): Promise<CategoryResponse> {
    return await this.itemRepository.findAllCategory(paginationDto);
  }

  async findItemById(id: string): Promise<Item> {
    const items = await this.itemRepository.findItemById(id);

    if (!items) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return items;
  }

  createItems(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.createItems(createItemDto);
  }

  async updateItems(id: string, updateItemDto: UpdateItemDto) {
    return this.itemRepository.updateItems(id, updateItemDto);
  }

  async removeItems(id: string) {
    const items = await this.itemRepository.findItemById(id);

    if (!items) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return this.itemRepository.removeItems(id);
  }

  createCategory(categoryDto: CategoryDto): Promise<Category> {
    return this.itemRepository.createCategory(categoryDto);
  }

  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.itemRepository.updateCategory(id, updateCategoryDto)
  }

  async removeCategory(id: string) {
    const category = await this.itemRepository.findCategoryById(id)
    
    if (!category) {
      throw new NotFoundException(`ups Category not found`);
    }
    return this.itemRepository.removeCategory(id)
  }
}
