import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-appointment.dto';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {}
