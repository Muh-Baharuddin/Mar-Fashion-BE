import { Test, TestingModule } from '@nestjs/testing';
import { KaryawanController } from './karyawan.controller';
import { KaryawanService } from './karyawan.service';

describe('KaryawanController', () => {
  let controller: KaryawanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KaryawanController],
      providers: [KaryawanService],
    }).compile();

    controller = module.get<KaryawanController>(KaryawanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
