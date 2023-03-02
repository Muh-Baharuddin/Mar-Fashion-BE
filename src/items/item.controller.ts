import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Items } from './entities/items.entity';

@Controller('item')
@UseGuards(JwtAuthGuard)
export class ItemsController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll() {
    return this.itemService.findAllItems();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Items> {
    return this.itemService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.createItems(createItemDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.updateItems(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.itemService.removeItems(id);
  }
}
