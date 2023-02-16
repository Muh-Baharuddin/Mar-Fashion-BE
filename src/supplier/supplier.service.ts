import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateSupplierDto,
  PaginationSupplierDto,
} from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { SupplierRepository } from './supplier.repository';
import { SupplierResponse } from './types/supplier.response.type';

@Injectable()
export class SupplierService {
  private readonly logger = new Logger(SupplierService.name);

  constructor(
    @Inject(SupplierRepository)
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async findAllSupplier(
    paginationDto: PaginationSupplierDto,
  ): Promise<SupplierResponse> {
    return await this.supplierRepository.findAllSupplier(paginationDto);
  }

  async findById(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new NotFoundException(`ups supplier not found`);
      this.logger.warn(`supplier tidak ditemukan`);
    }
    return supplier;
  }

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.supplierRepository.createSupplier(createSupplierDto);
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new NotFoundException(`ups supplier not found`);
      this.logger.warn(`supplier tidak ditemukan`);
    }
    return this.supplierRepository.updateSupplier(id, updateSupplierDto);
  }

  async remove(id: string) {
    const supplier = await this.supplierRepository.findById(id);

    if (!supplier) {
      throw new NotFoundException(`ups supplier not found`);
      this.logger.warn(`supplier tidak ditemukan`);
    }
    return this.supplierRepository.removeSupplier(id);
  }
}
