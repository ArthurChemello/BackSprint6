import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateEvolutionDto {
  @IsOptional()
  @IsString()
  consultation_type?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  start_time?: string;

  @IsOptional()
  @IsString()
  end_time?: string;
}