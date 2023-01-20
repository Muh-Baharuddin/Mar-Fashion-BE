import { Test, TestingModule } from '@nestjs/testing';
import { NotaPenjualanController } from './nota-penjualan.controller';
import { NotaPenjualanService } from './nota-penjualan.service';

describe('NotaPenjualanController', () => {
  let controller: NotaPenjualanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotaPenjualanController],
      providers: [NotaPenjualanService],
    }).compile();

    controller = module.get<NotaPenjualanController>(NotaPenjualanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
