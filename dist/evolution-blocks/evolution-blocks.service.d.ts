import { CreateEvolutionBlockDto } from './dto/create-evolution-block.dto';
import { UpdateEvolutionBlockDto } from './dto/update-evolution-block.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadService } from '../upload/upload.service';
export declare class EvolutionBlocksService {
    private readonly supabaseService;
    private readonly uploadService;
    constructor(supabaseService: SupabaseService, uploadService: UploadService);
    create(createEvolutionBlockDto: CreateEvolutionBlockDto, file?: Express.Multer.File): Promise<any>;
    findByEvolution(evolutionId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateEvolutionBlockDto: UpdateEvolutionBlockDto, file?: Express.Multer.File): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
