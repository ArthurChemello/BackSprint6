import { Module } from '@nestjs/common';
import { EvolutionBlocksService } from './evolution-blocks.service';
import { EvolutionBlocksController } from './evolution-blocks.controller';
import { UploadModule } from '../upload/upload.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [UploadModule, AuthModule],
  controllers: [EvolutionBlocksController],
  providers: [EvolutionBlocksService],
  exports: [EvolutionBlocksService],
})
export class EvolutionBlocksModule {}