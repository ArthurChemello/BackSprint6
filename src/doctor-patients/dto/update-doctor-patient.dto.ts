import { IsOptional, IsString } from 'class-validator';

export class UpdateDoctorPatientDto {
  @IsOptional()
  @IsString()
  access_type?: string;

  @IsOptional()
  @IsString()
  status?: string;
}