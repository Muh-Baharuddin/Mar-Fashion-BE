import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { SaleResponse } from './types/sale.response.type';

@Controller('sale')
@UseGuards(JwtAuthGuard)
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  findAll(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationSaleDto: PaginationSaleDto,
  ): Promise<SaleResponse> {
    return this.saleService.findAll(paginationSaleDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.createSale(createSaleDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.saleService.updateSale(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.saleService.removeSale(id);
  }
}
