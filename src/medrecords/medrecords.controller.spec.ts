import { Test, TestingModule } from '@nestjs/testing';
import { MedrecordsController } from './medrecords.controller';
import { MedrecordsService } from './medrecords.service';

describe('MedrecordsController', () => {
  let controller: MedrecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedrecordsController],
      providers: [MedrecordsService],
    }).compile();

    controller = module.get<MedrecordsController>(MedrecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
