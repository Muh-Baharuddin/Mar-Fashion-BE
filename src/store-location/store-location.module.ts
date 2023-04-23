import { Module } from '@nestjs/common';
import { StoreLocationService } from './store-location.service';
import { StoreLocationController } from './store-location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreLocation } from './entities/store-location.entity';
import { StoreLocationRepository } from './store-location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreLocation])],
  controllers: [StoreLocationController],
  providers: [StoreLocationService, StoreLocationRepository]
})
export class StoreLocationModule {}
