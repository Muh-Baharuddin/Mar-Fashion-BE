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
import { Karyawan } from './entities/karyawan.entity';
import { EmployeeService } from './employee.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('employee')
@UseGuards(JwtAuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll() {
    return this.employeeService.findAllKaryawan();
  }

  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<Karyawan> {
    return this.employeeService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.createKaryawan(createEmployeeDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateKaryawan(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.removeKaryawan(id);
  }
}
