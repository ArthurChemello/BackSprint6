import { SupabaseService } from '../supabase/supabase.service';
export declare class UploadService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    uploadFile(file: Express.Multer.File, bucket: string): Promise<string>;
}
