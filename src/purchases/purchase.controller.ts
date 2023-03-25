import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaginationPurchaseDto } from './dto/pagination-purchase.dto';
import { PurchaseResponse } from './types/purchase.response.type';

@Controller('purchase')
@UseGuards(JwtAuthGuard)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  findAll(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationPurchaseDto,
  ): Promise<PurchaseResponse> {
    return this.purchaseService.findAll(paginationDto);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Purchase> {
    return this.purchaseService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  // @Patch(':id')
  // @UsePipes(ValidationPipe)
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updatePurchaseDto: UpdatePurchaseDto,
  // ) {
  //   return this.purchaseService.update(id, updatePurchaseDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(id);
  }
}
