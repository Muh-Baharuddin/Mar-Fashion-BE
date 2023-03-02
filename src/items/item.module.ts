import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemsController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entity';
import { Category } from './entities/category.entity';
import { ItemRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Items, Category])],
  controllers: [ItemsController],
  providers: [ItemService, ItemRepository],
})
export class ItemsModule {}
