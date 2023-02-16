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
import { Supplier } from './entities/supplier.entity';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { PaginationSupplierDto } from './dto/pagination-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { SupplierResponse } from './types/supplier.response.type';

@Controller('supplier')
@UseGuards(JwtAuthGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  findAllSupplier(
    @Query() paginationDto: PaginationSupplierDto,
  ): Promise<SupplierResponse> {
    return this.supplierService.findAllSupplier(paginationDto);
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Supplier> {
    return this.supplierService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.supplierService.remove(id);
  }
}
