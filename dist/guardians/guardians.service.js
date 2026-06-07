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
exports.GuardiansService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let GuardiansService = class GuardiansService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createGuardianDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('guardians')
            .insert(createGuardianDto)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findByPatient(patientId) {
        const { data, error } = await this.supabaseService.supabase
            .from('guardians')
            .select('*')
            .eq('patient_id', patientId);
        if (error)
            throw new Error(error.message);
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.supabase
            .from('guardians')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async update(id, updateGuardianDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('guardians')
            .update(updateGuardianDto)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    async remove(id) {
        const { error } = await this.supabaseService.supabase
            .from('guardians')
            .delete()
            .eq('id', id);
        if (error)
            throw new Error(error.message);
        return { message: 'Responsável removido com sucesso!' };
    }
};
exports.GuardiansService = GuardiansService;
exports.GuardiansService = GuardiansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], GuardiansService);
//# sourceMappingURL=guardians.service.js.map