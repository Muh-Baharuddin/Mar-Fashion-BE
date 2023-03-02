import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employees } from './entities/employees.entity';
import { EmployeeService } from './employee.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAllEmployees();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Employees> {
    return this.employeeService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createEmployees(createEmployeeDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployees(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.removeEmployees(id);
  }
}
