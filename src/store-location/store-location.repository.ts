import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';
import { StoreLocation } from './entities/store-location.entity';
import { PaginationStoreDto } from './dto/pagination-store.dto';
import { StoreLocationResponse } from './types/store_location-response';
import { CreateStoreLocationDto } from './dto/create-store-location.dto';

@Injectable()
export class StoreLocationRepository {
  private storeRepository: Repository<StoreLocation>;

  constructor(private dataSource: DataSource) {
    this.storeRepository = this.dataSource.getRepository(StoreLocation);
  }

  async findAllStore(
    paginationDto: PaginationStoreDto,
  ): Promise<StoreLocationResponse> {
    const qb = this.storeRepository.createQueryBuilder('store-location');

    if (paginationDto.keywords) {
      paginationDto.page = 1;
      qb.where(
        new Brackets((qb) => {
          qb.where(`CONCAT(
            store-location.name, ' ', 
            store-location.address, ' ', 
            store-location.city) ILike :keywords`, 
            { 
              keywords: `%${paginationDto.keywords}%` 
            });
        })
      );
    }

    qb.orderBy(`store-location.${paginationDto.orderBy}`, paginationDto.orderType)
    .skip((paginationDto.page - 1) * paginationDto.limit)
    .take(paginationDto.limit)

    const [data, total] = await qb.getManyAndCount();
    return {
      data,
      total,
    };
  }

  // findComplaintById(id: string): Promise<CustomerComplaint> {
  //   return this.complaintRepository.findOne({
  //     where: { id },
  //   });
  // }

  async createStoreLocation(createStoreLocationDto: CreateStoreLocationDto): Promise<StoreLocation> {
    return this.storeRepository.save(createStoreLocationDto);
  }

  // async updateComplaint(id: string, updateComplaintDto: UpdateComplaintDto) {
  //   await this.complaintRepository.update(id, updateComplaintDto);
  //   return {
  //     message: 'Update Customer Compaint Success',
  //   };
  // }

  // async removeComplaint(id: string) {
  //   await this.complaintRepository.delete(id);
  //   return {
  //     message: 'Delete Customer Complaint Success',
  //   };
  // }
}
