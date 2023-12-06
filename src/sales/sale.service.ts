import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { PaginationSaleDto } from './dto/pagination-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleRepository } from './sale.repository';
import { SaleResponse } from './types/sale.response.type';
import { Sale } from './entities/sale.entity';

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

  createSale(
    createSaleDto: CreateSaleDto,
  ): Promise<Sale> {
    return this.saleRepository.createSale(createSaleDto);
  }

  async updateSale(id: string, updateSaleDto: UpdateSaleDto) {
    return this.saleRepository.updateSale(
      id,
      updateSaleDto,
    );
  }

  async removeSale(id: string) {
    const sale = await this.saleRepository.findSaleById(id);

    if (!sale) {
      throw new NotFoundException('sale not found');
    }

    await this.saleRepository.removeItem(id);

    return this.saleRepository.removeSale(id);
  }
}
