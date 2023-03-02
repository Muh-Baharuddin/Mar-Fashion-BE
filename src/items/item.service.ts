import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ItemRepository } from './item.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items } from './entities/items.entity';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async findAllItems(): Promise<Items[]> {
    const items = await this.itemRepository.findAllItems();

    if (!items.length) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return items;
  }

  async findById(id: string): Promise<Items> {
    const items = await this.itemRepository.findById(id);

    if (!items) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return items;
  }

  createItems(createItemDto: CreateItemDto): Promise<Items> {
    return this.itemRepository.createItems(createItemDto);
  }

  async updateItems(id: string, updateItemDto: UpdateItemDto) {
    const items = await this.itemRepository.findById(id);

    if (!items) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return this.itemRepository.updateItems(id, updateItemDto);
  }

  async removeItems(id: string) {
    const items = await this.itemRepository.findById(id);

    if (!items) {
      throw new NotFoundException(`ups items not found`);
      this.logger.warn(`items not found`);
    }
    return this.itemRepository.removeItems(id);
  }
}
