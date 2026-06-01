import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateAccessCodeDto {
  @IsNotEmpty()
  @IsUUID()
  doctor_id: string;

  @IsNotEmpty()
  @IsUUID()
  patient_id: string;
}