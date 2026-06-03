import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadService } from '../upload/upload.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly uploadService: UploadService,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);

    const { data, error } = await this.supabaseService.supabase
      .from('doctors')
      .insert({
        ...createDoctorDto,
        password: hashedPassword,
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
      .from('doctors')
      .select('id, name, email, specialty, crm, phone, profile_picture, created_at');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('doctors')
      .select('id, name, email, specialty, crm, phone, profile_picture, created_at')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async searchByName(name: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('doctors')
      .select('id, name, email, specialty, crm, phone, profile_picture, created_at')
      .or(`name.ilike.%${name}%,name_search.fts.${name}`);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto, file?: Express.Multer.File) {
    if (file) {
      updateDoctorDto.profile_picture = await this.uploadService.uploadFile(
        file, process.env.SUPABASE_AVATARS_BUCKET,
      );
    }

    if (updateDoctorDto.password) {
      updateDoctorDto.password = await bcrypt.hash(updateDoctorDto.password, 10);
    }

    const { data, error } = await this.supabaseService.supabase
      .from('doctors')
      .update(updateDoctorDto)
      .eq('id', id)
      .select('id, name, email, specialty, crm, phone, profile_picture, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.supabase
      .from('doctors')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
    return { message: 'Médico removido com sucesso!' };
  }
}
