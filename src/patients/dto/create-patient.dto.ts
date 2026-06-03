import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCPF } from '../../validators/cpf.validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsCPF({ message: 'CPF inválido!' })
  cpf?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  profession?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  chronic_diseases?: string;

  @IsOptional()
  @IsString()
  current_medications?: string;

  @IsOptional()
  @IsString()
  blood_type?: string;
}