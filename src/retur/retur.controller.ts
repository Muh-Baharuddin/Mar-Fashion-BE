import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturService } from './retur.service';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
import { Retur } from './entities/retur.entity';

@Controller('retur')
export class ReturController {
  constructor(private readonly returService: ReturService) {}

  @Get()
  findAll() {
    return this.returService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Retur> {
    return this.returService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createReturDto: CreateReturDto) {
    return this.returService.create(createReturDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReturDto: UpdateReturDto,
  ) {
    return this.returService.update(id, updateReturDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returService.remove(+id);
  }
}
