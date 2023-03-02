import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseRepository {
  private repository: Repository<Purchase>;

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Purchase);
  }

  findAllPurchase(): Promise<Purchase[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<Purchase> {
    return this.repository.findOne({
      where: { id },
    });
  }

  createPurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<Purchase> {
    return this.repository.save(createPurchaseDto);
  }

  async updatePurchase(
    id: string,
    updatePurchaseDto: UpdatePurchaseDto,
  ) {
    await this.repository.update(id, updatePurchaseDto);
    return {
      message: 'Update Purchase Success',
    };
  }

  async removePurchase(id: string) {
    await this.repository.delete(id);
    return {
      message: 'Delete Purchase Success',
    };
  }
}
