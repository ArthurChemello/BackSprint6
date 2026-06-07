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
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const upload_service_1 = require("../upload/upload.service");
const bcrypt = __importStar(require("bcrypt"));
let DoctorsService = class DoctorsService {
    constructor(supabaseService, uploadService) {
        this.supabaseService = supabaseService;
        this.uploadService = uploadService;
    }
    async create(createDoctorDto) {
        const email = createDoctorDto.email.toLowerCase();
        const { data: existing } = await this.supabaseService.supabase
            .from('doctors')
            .select('id')
            .eq('email', email)
            .single();
        if (existing) {
            throw new Error('Email já cadastrado!');
        }
        const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
        const { data, error } = await this.supabaseService.supabase
            .from('doctors')
            .insert(Object.assign(Object.assign({}, createDoctorDto), { email, password: hashedPassword }))
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
    async findOne(id) {
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
    async searchByName(name) {
        const { data, error } = await this.supabaseService.supabase
            .from('doctors')
            .select('id, name, email, specialty, crm, phone, profile_picture, created_at')
            .or(`name.ilike.%${name}%,name_search.fts.${name}`);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateDoctorDto, file) {
        if (file) {
            updateDoctorDto.profile_picture = await this.uploadService.uploadFile(file, process.env.SUPABASE_AVATARS_BUCKET);
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
    async remove(id) {
        const { error } = await this.supabaseService.supabase
            .from('doctors')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Médico removido com sucesso!' };
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        upload_service_1.UploadService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map