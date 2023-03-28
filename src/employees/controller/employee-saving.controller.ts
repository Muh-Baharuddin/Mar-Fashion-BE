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
import { EmployeeSavingResponse } from '../types/employee-response.type';
import { EmployeeSavingService } from '../service/employee-saving.service';
import { PaginationSavingDto } from '../dto/pagination-employee-saving.dto';
import { CreateEmployeeSavingDto } from '../dto/create-saving.dto';
import { UpdateEmployeeSavingDto } from '../dto/update-saving.dto';

@Controller('employee-saving')
@UseGuards(JwtAuthGuard)
export class EmployeeSavingController {
  constructor(private readonly employeeSavingService: EmployeeSavingService) {}

  @Get()
  findAll(
    @Query(new ValidationPipe({
      transformOptions: {enableImplicitConversion: true},
    })) paginationDto: PaginationSavingDto,
  ): Promise<EmployeeSavingResponse>{
    return this.employeeSavingService.findAllSaving(paginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEmployeeSavingDto: CreateEmployeeSavingDto) {
    return this.employeeSavingService.createSaving(createEmployeeSavingDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeSavingDto,
  ) {
    return this.employeeSavingService.updateSaving(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeSavingService.removeSaving(id);
  }
}
