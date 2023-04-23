import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { CustomerComplaintService } from './customer_complaint.service';
import { CreateComplaintDto } from './dto/create-customer_complaint.dto';
import { UpdateComplaintDto } from './dto/update-customer_complaint.dto';
import { PaginationComplaintDto } from './dto/pagination-complaint.dto';
import { CustomerComplaintResponse } from './types/customer_complaint-response';

@Controller('customer-complaint')
export class CustomerComplaintController {
  constructor(
    private readonly customerComplaintService: CustomerComplaintService,
  ) {}

  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    paginationDto: PaginationComplaintDto,
  ): Promise<CustomerComplaintResponse> {
    return this.customerComplaintService.findAllComplaint(paginationDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.customerComplaintService.createComplaint(createComplaintDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.customerComplaintService.updateComplaint(
      id,
      updateComplaintDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.customerComplaintService.removeComplaint(id);
  }
}
