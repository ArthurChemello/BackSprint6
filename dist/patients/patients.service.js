"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const bcrypt = __importStar(require("bcrypt"));
let PatientsService = class PatientsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createPatientDto) {
        var _a;
        const birthDate = createPatientDto.birth_date.replace(/-/g, '');
        const city = (_a = createPatientDto.city) !== null && _a !== void 0 ? _a : 'semcidade';
        const rawPassword = `${birthDate}${city.replace(/\s/g, '')}`;
        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const { data, error } = await this.supabaseService.supabase
            .from('patients')
            .insert(Object.assign(Object.assign({}, createPatientDto), { email: createPatientDto.email.toLowerCase(), password: hashedPassword, first_login: true }))
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
    async searchByName(name, doctorId) {
        const { data, error } = await this.supabaseService.supabase
            .from('patients')
            .select('id, name, city')
            .or(`name.ilike.%${name}%,name_search.fts.${name}`);
        if (error) {
            throw new Error(error.message);
        }
        const { data: links } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('patient_id, access_type, status')
            .eq('doctor_id', doctorId);
        return data.map((patient) => {
            var _a, _b;
            const link = links === null || links === void 0 ? void 0 : links.find((l) => l.patient_id === patient.id);
            return Object.assign(Object.assign({}, patient), { access_type: (_a = link === null || link === void 0 ? void 0 : link.access_type) !== null && _a !== void 0 ? _a : null, status: (_b = link === null || link === void 0 ? void 0 : link.status) !== null && _b !== void 0 ? _b : null });
        });
    }
    async searchByNameForDoctor(name, doctorId) {
        const { data: links } = await this.supabaseService.supabase
            .from('doctor_patients')
            .select('patient_id')
            .eq('doctor_id', doctorId);
        const patientIds = links.map((link) => link.patient_id);
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
    async findOne(id) {
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
    async update(id, updatePatientDto) {
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
    async remove(id) {
        const { error } = await this.supabaseService.supabase
            .from('patients')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Paciente removido com sucesso' };
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map