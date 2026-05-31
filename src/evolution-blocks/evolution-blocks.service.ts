import { Injectable } from '@nestjs/common';
import { CreateEvolutionBlockDto } from './dto/create-evolution-block.dto';
import { UpdateEvolutionBlockDto } from './dto/update-evolution-block.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { UploadService } from '../upload/upload.service';
import { error } from 'node:console';

@Injectable()
export class EvolutionBlocksService {
    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly uploadService: UploadService,
    ) { }

    async create(createEvolutionBlockDto: CreateEvolutionBlockDto, file?: Express.Multer.File) {
        if (file) {
            createEvolutionBlockDto.content = await this.uploadService.uploadFile(
                file,
                process.env.SUPABASE_EVOLUTION_BUCKET,
            );
            createEvolutionBlockDto.type = 'imagem';
        }

        const { data, error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .insert(createEvolutionBlockDto)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findByEvolution(evolutionId: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .select('*')
            .eq('evolution_id', evolutionId)
            .order('order', { ascending: true });

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async findOne(id: string) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async update(id: string, updateEvolutionBlockDto: UpdateEvolutionBlockDto, file?: Express.Multer.File) {
        if (file) {
            updateEvolutionBlockDto.content = await this.uploadService.uploadFile(
                file,
                process.env.SUPABASE_EVOLUTION_BUCKET,
            );
        }

        const { data, error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .update(updateEvolutionBlockDto)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    async remove(id: string) {
        const { error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .delete()
            .eq('id', id);

        if(error){
            throw new Error(error.message);
        }
        return { message: 'Bloco removido com sucesso!'};
    }

}
