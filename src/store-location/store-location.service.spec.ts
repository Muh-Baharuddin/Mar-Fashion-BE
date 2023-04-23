import { Test, TestingModule } from '@nestjs/testing';
import { StoreLocationService } from './store-location.service';

describe('StoreLocationService', () => {
  let service: StoreLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreLocationService],
    }).compile();

    service = module.get<StoreLocationService>(StoreLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
