import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturService } from './retur.service';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
import { Retur } from './entities/retur.entity';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('retur')
export class ReturController {
  constructor(private readonly returService: ReturService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.returService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Retur> {
    return this.returService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createReturDto: CreateReturDto) {
    return this.returService.create(createReturDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReturDto: UpdateReturDto,
  ) {
    return this.returService.update(id, updateReturDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.returService.remove(id);
  }
}
