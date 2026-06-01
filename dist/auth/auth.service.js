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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const supabase_service_1 = require("../supabase/supabase.service");
const google_calendar_service_1 = require("../google-calendar/google-calendar.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    constructor(jwtService, supabaseService, googleCalendarService) {
        this.jwtService = jwtService;
        this.supabaseService = supabaseService;
        this.googleCalendarService = googleCalendarService;
    }
    async loginDoctor(email, password) {
        const { data: doctor } = await this.supabaseService.supabase
            .from('doctors')
            .select('*')
            .eq('email', email)
            .single();
        if (!doctor) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const validPassword = await bcrypt.compare(password, doctor.password);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const token = this.jwtService.sign({
            sub: doctor.id,
            email: doctor.email,
            role: 'doctor',
        });
        return { token, doctor };
    }
    async loginPatient(email, password) {
        const { data: patient } = await this.supabaseService.supabase
            .from('patients')
            .select('*')
            .eq('email', email)
            .single();
        if (!patient) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const validPassword = await bcrypt.compare(password, patient.password);
        if (!validPassword) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const token = this.jwtService.sign({
            sub: patient.id,
            email: patient.email,
            role: 'patient',
        });
        return { token, patient };
    }
    getGoogleAuthUrl(doctorId) {
        return this.googleCalendarService.getAuthUrl(doctorId);
    }
    async handleGoogleCallback(code, doctorId) {
        const tokens = await this.googleCalendarService.getToken(code);
        await this.supabaseService.supabase
            .from('google_tokens')
            .upsert({
            doctor_id: doctorId,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_at: new Date(tokens.expiry_date),
        });
        return { message: 'Google Calendar conectado com sucesso!' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        supabase_service_1.SupabaseService,
        google_calendar_service_1.GoogleCalendarService])
], AuthService);
//# sourceMappingURL=auth.service.js.map