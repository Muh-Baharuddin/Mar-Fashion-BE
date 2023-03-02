import { Test, TestingModule } from '@nestjs/testing';
import { BarangController } from './item.controller';
import { BarangService } from './item.service';

describe('BarangController', () => {
  let controller: BarangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BarangController],
      providers: [BarangService],
    }).compile();

    controller = module.get<BarangController>(BarangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
