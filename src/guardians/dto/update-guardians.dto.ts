import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-guardians.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
