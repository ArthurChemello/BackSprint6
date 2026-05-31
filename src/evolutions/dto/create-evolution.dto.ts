import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEvolutionDto {
  @IsNotEmpty()
  @IsUUID()
  patient_id: string;

  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @IsNotEmpty()
  @IsString()
  consultation_type: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsString()
  start_time: string;

  @IsNotEmpty()
  @IsString()
  end_time: string;
}