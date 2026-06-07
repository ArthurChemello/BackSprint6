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
exports.DoctorPatientsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let DoctorPatientsService = class DoctorPatientsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createDoctorPatientDto) {
        var _a;
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .insert(Object.assign(Object.assign({}, createDoctorPatientDto), { status: 'pending', access_type: (_a = createDoctorPatientDto.access_type) !== null && _a !== void 0 ? _a : 'emergency' }))
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByDoctor(doctorId) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('*, patients(name, email, phone)')
            .eq('doctor_id', doctorId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByPatient(patient_id) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('*, doctors(name, specialty, phone, profile_picture)')
            .eq('patient_id', patient_id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateDoctorPatientDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctor_patients')
            .update(updateDoctorPatientDto)
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
            .from('doctor_patients')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Vínculo removido com sucesso!' };
    }
};
exports.DoctorPatientsService = DoctorPatientsService;
exports.DoctorPatientsService = DoctorPatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], DoctorPatientsService);
//# sourceMappingURL=doctor-patients.service.js.map