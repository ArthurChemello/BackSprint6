import { Injectable } from '@nestjs/common';
import { CreateMedrecordDto } from './dto/create-medrecord.dto';
import { UpdateMedrecordDto } from './dto/update-medrecord.dto';

@Injectable()
export class MedrecordsService {
  create(createMedrecordDto: CreateMedrecordDto) {
    return 'This action adds a new medrecord';
  }

  findAll() {
    return `This action returns all medrecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medrecord`;
  }

  update(id: number, updateMedrecordDto: UpdateMedrecordDto) {
    return `This action updates a #${id} medrecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} medrecord`;
  }
}
