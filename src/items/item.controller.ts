import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/items.entity';
import { PaginationItemDto } from './dto/pagination-item.dto';
import { ItemResponse } from './types/item.response.type';
import { CategoryResponse } from './types/category.response.type';
import { PaginationCategoryDto } from './dto/pagination-category.dto';

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  async findAllItems(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationItemDto,
  ): Promise<ItemResponse>{
    return this.itemService.findAllItems(paginationDto);
  }

  @Get('/category')
  findAllCategory(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationCategoryDto,
  ): Promise<CategoryResponse> {
    return this.itemService.findAllCategory(paginationDto);
  }

  @Get(':id')
  findItemById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return this.itemService.findItemById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItems(createItemDto);
  }

  // @Patch(':id')
  // @UsePipes(ValidationPipe)
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateItemDto: UpdateItemDto,
  // ) {
  //   return this.itemService.updateItems(id, updateItemDto);
  // }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.removeItems(id);
  }
}
