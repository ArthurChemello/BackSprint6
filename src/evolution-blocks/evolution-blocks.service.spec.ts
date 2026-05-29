import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionBlocksService } from './evolution-blocks.service';

describe('EvolutionBlocksService', () => {
  let service: EvolutionBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvolutionBlocksService],
    }).compile();

    service = module.get<EvolutionBlocksService>(EvolutionBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
