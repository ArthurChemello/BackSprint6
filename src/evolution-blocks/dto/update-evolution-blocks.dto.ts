import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-evolution-blocks.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
