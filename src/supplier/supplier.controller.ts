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
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('supplier')
@UseGuards(JwtAuthGuard)
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  findAllSupplier(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<{
    dataSupplier: Supplier[];
    total: number;
    currentPage: number;
    lastPage: number;
  }> {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return this.supplierService.findAllSupplier(pageNumber, limitNumber);
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
