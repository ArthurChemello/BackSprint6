"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionBlocksService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const upload_service_1 = require("../upload/upload.service");
let EvolutionBlocksService = class EvolutionBlocksService {
    constructor(supabaseService, uploadService) {
        this.supabaseService = supabaseService;
        this.uploadService = uploadService;
    }
    async create(createEvolutionBlockDto, file) {
        if (file) {
            createEvolutionBlockDto.content = await this.uploadService.uploadFile(file, process.env.SUPABASE_EVOLUTION_BUCKET);
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
    async findByEvolution(evolutionId) {
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
    async findOne(id) {
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
    async update(id, updateEvolutionBlockDto, file) {
        if (file) {
            updateEvolutionBlockDto.content = await this.uploadService.uploadFile(file, process.env.SUPABASE_EVOLUTION_BUCKET);
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
    async remove(id) {
        const { error } = await this.supabaseService.supabase
            .from('evolution_blocks')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Bloco removido com sucesso!' };
    }
};
exports.EvolutionBlocksService = EvolutionBlocksService;
exports.EvolutionBlocksService = EvolutionBlocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        upload_service_1.UploadService])
], EvolutionBlocksService);
//# sourceMappingURL=evolution-blocks.service.js.map