import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SupabaseService } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientsService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async create(createPatientDto: CreatePatientDto) {
    const email = createPatientDto.email.toLowerCase();

    const { data: existing } = await this.supabaseService.supabase
      .from('patients')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      throw new Error('Email já cadastrado!');
    }
    const birthDate = createPatientDto.birth_date.replace(/-/g, '');
    const city = createPatientDto.city ?? 'semcidade';
    const rawPassword = `${birthDate}${city.replace(/\s/g, '')}`;
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .insert({
        ...createPatientDto,
        email,
        password: hashedPassword,
        first_login: true,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .select('id, name, birth_date, phone, email, cpf, address, city, profession, origin, allergies, chronic_diseases, current_medications, blood_type, first_login, created_at');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async searchByName(name: string, doctorId: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .select('id, name, birth_date, phone, email, cpf, address, city, profession, origin, allergies, chronic_diseases, current_medications, blood_type')
      .or(`name.ilike.%${name}%,name_search.fts.${name}`);

    if (error) {
      throw new Error(error.message);
    }

    const { data: links } = await this.supabaseService.supabase
      .from('doctor_patients')
      .select('patient_id, access_type, status')
      .eq('doctor_id', doctorId);

    return data.map((patient) => {
      const link = links?.find((l) => l.patient_id === patient.id);
      return {
        ...patient,
        access_type: link?.access_type ?? null,
        status: link?.status ?? null,
      };
    });
  }

  async searchByNameForDoctor(name: string, doctorId: string) {
    const { data: links } = await this.supabaseService.supabase
      .from('doctor_patients')
      .select('patient_id')
      .eq('doctor_id', doctorId);

    const patientIds = links.map((link: any) => link.patient_id);

    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .select('id, name, birth_date, phone, email, cpf, address, city, profession, origin, allergies, chronic_diseases, current_medications, blood_type, first_login, created_at')
      .in('id', patientIds)
      .or(`name.ilike.%${name}%,name_search.fts.${name}`);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .select('id, name, birth_date, phone, email, cpf, address, city, profession, origin, allergies, chronic_diseases, current_medications, blood_type, first_login, created_at')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    if (updatePatientDto.password) {
      updatePatientDto.password = await bcrypt.hash(updatePatientDto.password, 10);
      updatePatientDto.first_login = false;
    }

    const { data, error } = await this.supabaseService.supabase
      .from('patients')
      .update(updatePatientDto)
      .eq('id', id)
      .select('id, name, birth_date, phone, email, cpf, address, city, profession, origin, allergies, chronic_diseases, current_medications, blood_type, first_login, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
    return { message: 'Paciente removido com sucesso' }
  }
}