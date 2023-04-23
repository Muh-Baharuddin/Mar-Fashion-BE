import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreLocationService } from './store-location.service';
import { CreateStoreLocationDto } from './dto/create-store-location.dto';
import { UpdateStoreLocationDto } from './dto/update-store-location.dto';
import { PaginationStoreDto } from './dto/pagination-store.dto';
import { StoreLocationResponse } from './types/store_location-response';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller('store-location')
@UseGuards(JwtAuthGuard)
export class StoreLocationController {
  constructor(private readonly storeLocationService: StoreLocationService) {}

  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationDto: PaginationStoreDto,
  ): Promise<StoreLocationResponse> {
    return this.storeLocationService.findAllStore(paginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createStoreLocationDto: CreateStoreLocationDto) {
    return this.storeLocationService.createStoreLocation(createStoreLocationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeLocationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreLocationDto: UpdateStoreLocationDto) {
    return this.storeLocationService.update(+id, updateStoreLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeLocationService.remove(+id);
  }
}
