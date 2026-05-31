import { Module } from '@nestjs/common';
import { EvolutionBlocksService } from './evolution-blocks.service';
import { EvolutionBlocksController } from './evolution-blocks.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule],
  controllers: [EvolutionBlocksController],
  providers: [EvolutionBlocksService],
  exports: [EvolutionBlocksService],
})
export class EvolutionBlocksModule {}