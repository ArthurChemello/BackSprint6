import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-access-codes.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
