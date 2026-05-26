import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedrecordsService } from './medrecords.service';
import { CreateMedrecordDto } from './dto/create-medrecord.dto';
import { UpdateMedrecordDto } from './dto/update-medrecord.dto';

@Controller('medrecords')
export class MedrecordsController {
  constructor(private readonly medrecordsService: MedrecordsService) {}

  @Post()
  create(@Body() createMedrecordDto: CreateMedrecordDto) {
    return this.medrecordsService.create(createMedrecordDto);
  }

  @Get()
  findAll() {
    return this.medrecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medrecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedrecordDto: UpdateMedrecordDto) {
    return this.medrecordsService.update(+id, updateMedrecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medrecordsService.remove(+id);
  }
}
