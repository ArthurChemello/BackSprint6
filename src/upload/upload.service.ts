import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async uploadFile(
    file: Express.Multer.File,
    bucket: string,
  ): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await this.supabaseService.supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) throw new Error(error.message);

    const { data } = this.supabaseService.supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }
}