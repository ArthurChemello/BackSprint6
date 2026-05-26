import { PartialType } from '@nestjs/mapped-types';
import { CreateMedrecordDto } from './create-medrecord.dto';

export class UpdateMedrecordDto extends PartialType(CreateMedrecordDto) {}
