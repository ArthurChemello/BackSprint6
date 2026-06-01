import { Module } from '@nestjs/common';
import { EvolutionsService } from './evolutions.service';
import { EvolutionsController } from './evolutions.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [EvolutionsController],
  providers: [EvolutionsService],
  exports: [EvolutionsService],
})
export class EvolutionsModule {}