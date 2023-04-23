import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreLocationDto } from './dto/create-store-location.dto';
import { UpdateStoreLocationDto } from './dto/update-store-location.dto';
import { PaginationStoreDto } from './dto/pagination-store.dto';
import { StoreLocationResponse } from './types/store_location-response';
import { StoreLocationRepository } from './store-location.repository';

@Injectable()
export class StoreLocationService {
  
  constructor(
    @Inject(StoreLocationRepository)
    private readonly storeRepository: StoreLocationRepository,
  ) {}

  async findAllStore(
    paginationDto: PaginationStoreDto,
  ): Promise<StoreLocationResponse> {
    return await this.storeRepository.findAllStore(paginationDto);
  }

  createStoreLocation(createStoreLocationDto: CreateStoreLocationDto) {
    return this.storeRepository.createStoreLocation(createStoreLocationDto)
  }

  findOne(id: number) {
    return `This action returns a #${id} storeLocation`;
  }

  updateStoreLocation(id: string, updateStoreLocationDto: UpdateStoreLocationDto) {
    return this.storeRepository.updateStoreLocation(id, updateStoreLocationDto);
  }

  removeStoreLocation(id: string) {
    return this.storeRepository.removeStoreLocation(id);
  }
}
