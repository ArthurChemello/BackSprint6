import { Module } from '@nestjs/common';
import { EvolutionBlocksController } from './evolution-blocks.controller';
import { EvolutionBlocksService } from './evolution-blocks.service';

@Module({
  controllers: [EvolutionBlocksController],
  providers: [EvolutionBlocksService]
})
export class EvolutionBlocksModule {}
