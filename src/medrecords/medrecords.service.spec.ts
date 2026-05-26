import { Test, TestingModule } from '@nestjs/testing';
import { MedrecordsService } from './medrecords.service';

describe('MedrecordsService', () => {
  let service: MedrecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedrecordsService],
    }).compile();

    service = module.get<MedrecordsService>(MedrecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
