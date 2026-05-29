import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-evolutions.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
