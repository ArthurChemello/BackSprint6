import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateGuardianDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  relationship?: string;
}