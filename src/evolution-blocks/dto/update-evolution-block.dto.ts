import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEvolutionBlockDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}