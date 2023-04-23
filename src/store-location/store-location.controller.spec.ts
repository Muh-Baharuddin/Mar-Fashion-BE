import { Test, TestingModule } from '@nestjs/testing';
import { StoreLocationController } from './store-location.controller';
import { StoreLocationService } from './store-location.service';

describe('StoreLocationController', () => {
  let controller: StoreLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreLocationController],
      providers: [StoreLocationService],
    }).compile();

    controller = module.get<StoreLocationController>(StoreLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
