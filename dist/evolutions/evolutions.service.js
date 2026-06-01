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
exports.EvolutionsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let EvolutionsService = class EvolutionsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createEvolutionDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .insert(createEvolutionDto)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByPatient(patientId) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), doctors(name, specialty)')
            .eq('patient_id', patientId)
            .order('date', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByDoctor(doctorId) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), patients(name)')
            .eq('doctor_id', doctorId)
            .order('date', { ascending: false });
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .select('*, evolution_blocks(*), patients(name), doctors(name, specialty)')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateEvolutionDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('evolutions')
            .update(updateEvolutionDto)
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
            .from('evolutions')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Evolução removida com sucesso!' };
    }
};
exports.EvolutionsService = EvolutionsService;
exports.EvolutionsService = EvolutionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], EvolutionsService);
//# sourceMappingURL=evolutions.service.js.map