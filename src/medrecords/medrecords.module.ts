import { Module } from '@nestjs/common';
import { MedrecordsService } from './medrecords.service';
import { MedrecordsController } from './medrecords.controller';

@Module({
  controllers: [MedrecordsController],
  providers: [MedrecordsService],
})
export class MedrecordsModule {}
