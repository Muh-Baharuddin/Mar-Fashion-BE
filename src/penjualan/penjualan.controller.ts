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
import { PenjualanService } from './penjualan.service';
import { CreatePenjualanDto } from './dto/create-penjualan.dto';
import { UpdatePenjualanDto } from './dto/update-penjualan.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { PaginationPenjualanDto } from './dto/pagination-penjualan.dto';
import { PenjualanResponse } from './types/penjualan.response.type';

@Controller('penjualan')
@UseGuards(JwtAuthGuard)
export class PenjualanController {
  constructor(private readonly notaPenjualanService: PenjualanService) {}

  @Get()
  findAll(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationPenjualanDto: PaginationPenjualanDto,
  ): Promise<PenjualanResponse> {
    return this.notaPenjualanService.findAll(paginationPenjualanDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.notaPenjualanService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPenjualanDto: CreatePenjualanDto) {
    return this.notaPenjualanService.createPenjualan(createPenjualanDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePenjualanDto: UpdatePenjualanDto,
  ) {
    return this.notaPenjualanService.update(id, updatePenjualanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.notaPenjualanService.removePenjualan(id);
  }
}
