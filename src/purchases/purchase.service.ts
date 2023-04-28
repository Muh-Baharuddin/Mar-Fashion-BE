import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { PaginationPurchaseDto } from './dto/pagination-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseRepository } from './purchase.repository';
import { PurchaseResponse } from './types/purchase.response.type';

@Injectable()
export class PurchaseService {
  private readonly logger = new Logger(PurchaseService.name);

  constructor(
    @Inject(PurchaseRepository)
    private readonly purchaseRepository: PurchaseRepository,
  ) {}

  async findAll(
    paginationDto: PaginationPurchaseDto,
  ): Promise<PurchaseResponse> {
    return await this.purchaseRepository.findAllPurchase(paginationDto)
  }

  async findById(id: string): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findPurchaseById(id);

    if (!purchase) {
      throw new NotFoundException(`ups purchase not found`);
    }
    return purchase;
  }

  create(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.purchaseRepository.createPurchase(createPurchaseDto);
  }

  // async update(id: string, updatePurchaseDto: UpdatePurchaseDto) {
  //   const purchase = await this.purchaseRepository.findById(id);

  //   if (!purchase) {
  //     throw new NotFoundException(`ups purchase not found`);
  //     this.logger.warn(`purchase not found`);
  //   }
  //   return this.purchaseRepository.updatePurchase(
  //     id,
  //     updatePurchaseDto,
  //   );
  // }

  async remove(id: string) {
    const purchase = await this.purchaseRepository.findPurchaseById(id);

    if (!purchase) {
      throw new NotFoundException(`ups purchase not found`);
      this.logger.warn(`purchase not found`);
    }
    return this.purchaseRepository.removePurchase(id);
  }
}
