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
import { Employee_Saving } from '../entities/employee_saving.entity';
import { PaginationSavingDto } from '../dto/pagination-employee-saving.dto';
import { CreateEmployeeSavingDto } from '../dto/create-saving.dto';

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

  // @Get(':id')
  // findSavingById(@Param('id', ParseUUIDPipe) id: string): Promise<Employee_Saving> {
  //   return this.employeeSavingService.findSavingById(id);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEmployeeSavingDto: CreateEmployeeSavingDto) {
    return this.employeeSavingService.createSaving(createEmployeeSavingDto);
  }

  // @Patch(':id')
  // @UsePipes(ValidationPipe)
  // update(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @Body() updateEmployeeDto: UpdateEmployeeDto,
  // ) {
  //   return this.employeeService.updateEmployees(id, updateEmployeeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.employeeService.removeEmployees(id);
  // }
}
