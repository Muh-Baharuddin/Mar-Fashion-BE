import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { PaginationItemDto } from './dto/pagination-item.dto';
import { PaginationCategoryDto } from './dto/pagination-category.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Supplier } from '../supplier/entities/supplier.entity';
import { Category } from './entities/category.entity';
import { Item } from './entities/items.entity';
import { CategoryResponse } from './types/category.response.type';
import { ItemResponse } from './types/item.response.type';

@Injectable()
export class ItemRepository {
  private itemRepository: Repository<Item>;
  private categoryRepository: Repository<Category>;
  private supplierRepository: Repository<Supplier>;

  constructor(private dataSource: DataSource) {
    this.itemRepository = this.dataSource.getRepository(Item);
    this.categoryRepository = this.dataSource.getRepository(Category);
    this.supplierRepository = this.dataSource.getRepository(Supplier);
  }

  async findAllItems(
    paginationDto: PaginationItemDto,
  ): Promise<ItemResponse> {
    const queryBuilder = this.itemRepository.createQueryBuilder('item')
      .leftJoinAndSelect('item.categories', 'category')
      .leftJoin('item.supplier', 'supplier')
      .addSelect('supplier.name')
    if (paginationDto.keywords) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('item.brand ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` })
          .orWhere('item.capital_price::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` })
          .orWhere('item.wholescale_price::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` })
          .orWhere('item.stock::text ILIKE :keyword', { keyword: `%${paginationDto.keywords}%` });
      }));
    }
    if (paginationDto.orderBy === 'supplier') {
      queryBuilder.orderBy('supplier.name', paginationDto.orderType)
    } else {
      queryBuilder.orderBy(`item.${paginationDto.orderBy}`, paginationDto.orderType)
    }
    queryBuilder.skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)
    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
    };
  }

  findItemById(id: string): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
    });
  }

  async findAllCategory(
    paginationCategoryDto: PaginationCategoryDto,
  ): Promise<CategoryResponse> {
    const queryBuilder = this.categoryRepository.createQueryBuilder('category')
    .orderBy(`category.${paginationCategoryDto.orderBy}`, paginationCategoryDto.orderType)
    .skip((paginationCategoryDto.page - 1) * paginationCategoryDto.limit)
    .take(paginationCategoryDto.limit)
    const [data, total] = await queryBuilder.getManyAndCount();
    return {
      data,
      total,
    };
  }

  findCategoryById(id: string): Promise<Category> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  findSupplierById(id: string): Promise<Supplier> {
    return this.supplierRepository.findOne({
      where: { id },
    });
  }

  async createItems(createItemDto: CreateItemDto): Promise<Item> {
    const { categories, supplierId, ...itemData } = createItemDto;
    const newItem = this.itemRepository.create(itemData);
    if (supplierId) {
      const supplier = await this.findSupplierById(supplierId);
      if (!supplier) {
        throw new Error(`Supplier with id ${supplierId} not found.`);
      }
      newItem.supplier = Promise.resolve(supplier);
    }
    if (categories) {
      const promises = categories.map(async (categoryDto) => {
        let category = await this.findCategoryById(categoryDto.id);
        if (!category) {
          category = this.categoryRepository.create(categoryDto);
          await this.categoryRepository.save(category);
        }
        return category;
      });
      const itemCategories = await Promise.all(promises);
      newItem.categories = Promise.resolve(itemCategories);
    }
    return this.itemRepository.save(newItem);
  }
  
  async updateItems(id: string, updateItemDto: UpdateItemDto) {
    const newItem = await this.findItemById(id);
    if (!newItem) {
      throw new Error(`Item with id ${id} not found.`);
    }
    Object.assign(newItem, updateItemDto);
    await this.itemRepository.save(newItem);
    return {
      message: 'Update Item Success',
    };
  }

  async removeItems(id: string) {
    await this.itemRepository.delete(id);
    return {
      message: 'Delete Item Success',
    };
  }
}
