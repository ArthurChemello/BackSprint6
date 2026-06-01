import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateAccessCodeDto {
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}