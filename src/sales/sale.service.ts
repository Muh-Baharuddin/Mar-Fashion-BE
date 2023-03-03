import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleRepository } from './sale.repository';
import { SaleResponse } from './types/sale.response.type';

@Injectable()
export class SaleService {
  private readonly logger = new Logger(SaleService.name);

  constructor(
    @Inject(SaleRepository)
    private readonly saleRepository: SaleRepository,
  ) {}

  async findAll(
    paginationSaleDto: PaginationSaleDto,
  ): Promise<SaleResponse> {
    return await this.saleRepository.findAllSale(paginationSaleDto);
  }

  async findById(id: string) {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
      throw new NotFoundException('sale not found');
    }
    return sale;
  }

  createSale(createSaleDto: CreateSaleDto) {
    return this.saleRepository.createSale(createSaleDto);
  }

  async update(id: string, updateSaleDto: UpdateSaleDto) {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
      throw new NotFoundException(`sale not found`);
    }

    return this.saleRepository.updateSale(
      id,
      updateSaleDto,
    );
  }

  async removeSale(id: string) {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
      throw new NotFoundException('sale not found');
    }
    return this.saleRepository.removeSale(id);
  }
}
