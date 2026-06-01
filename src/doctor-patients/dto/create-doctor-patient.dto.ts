import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDoctorPatientDto {
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @IsNotEmpty()
  @IsUUID()
  patient_id: string;

  @IsOptional()
  @IsString()
  access_type?: string;
}