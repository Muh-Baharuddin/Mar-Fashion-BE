import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items } from './entities/items.entity';

@Injectable()
export class ItemRepository {
  private repository: Repository<Items>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Items);
  }

  findAllItems(): Promise<Items[]> {
    return this.repository.find();
  }

  findById(id_item: string): Promise<Items> {
    return this.repository.findOne({
      where: { id_item },
    });
  }

  createItems(createItemDto: CreateItemDto): Promise<Items> {
    return this.repository.save(createItemDto);
  }

  async updateItems(id: string, updateItemDto: UpdateItemDto) {
    await this.repository.update(id, updateItemDto);
    return {
      message: 'Update Item Success',
    };
  }

  async removeItems(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Item Success',
    };
  }
}
