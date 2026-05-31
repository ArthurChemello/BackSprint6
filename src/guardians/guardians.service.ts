import { Injectable } from '@nestjs/common';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class GuardiansService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createGuardianDto: CreateGuardianDto) {
    const { data, error } = await this.supabaseService.supabase
      .from('guardians')
      .insert(createGuardianDto)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findByPatient(patientId: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('guardians')
      .select('*')
      .eq('patient_id', patientId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('guardians')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, updateGuardianDto: UpdateGuardianDto) {
    const { data, error } = await this.supabaseService.supabase
      .from('guardians')
      .update(updateGuardianDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.supabase
      .from('guardians')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { message: 'Responsável removido com sucesso!' };
  }
}