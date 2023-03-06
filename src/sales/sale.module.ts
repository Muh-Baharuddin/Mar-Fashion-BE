import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { Sale } from './entities/sale.entity';
import { Customer } from './entities/customer.entity';
import { SaleRepository } from './sale.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Customer])],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository]
})
export class SaleModule {}
