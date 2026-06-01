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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
const google_calendar_service_1 = require("../google-calendar/google-calendar.service");
let AppointmentsService = class AppointmentsService {
    constructor(supabaseService, googleCalendarService) {
        this.supabaseService = supabaseService;
        this.googleCalendarService = googleCalendarService;
    }
    async create(createAppointmentDto) {
        const { data: patient } = await this.supabaseService.supabase
            .from('patients')
            .select('name, email')
            .eq('id', createAppointmentDto.patient_id)
            .single();
        const { data: tokens } = await this.supabaseService.supabase
            .from('google_tokens')
            .select('access_token, refresh_token')
            .eq('doctor_id', createAppointmentDto.doctor_id)
            .single();
        let google_event_id = null;
        if (tokens && (patient === null || patient === void 0 ? void 0 : patient.email)) {
            google_event_id = await this.googleCalendarService.createEvent(tokens.access_token, tokens.refresh_token, {
                title: createAppointmentDto.title,
                date: createAppointmentDto.date,
                startTime: createAppointmentDto.start_time,
                endTime: createAppointmentDto.end_time,
                patientName: patient.name,
                patientEmail: patient.email,
            });
        }
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .insert(Object.assign(Object.assign({}, createAppointmentDto), { google_event_id }))
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name), doctors(name)');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByDoctor(doctorId) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name, email)')
            .eq('doctor_id', doctorId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findByPatient(patientId) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, doctors(name, phone, specialty, profile_picture)')
            .eq('patient_id', patientId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .select('*, patients(name, email), doctors(name, phone, specialty, profile_picture)')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async update(id, updateAppointmentDto) {
        const { data, error } = await this.supabaseService.supabase
            .from('appointments')
            .update(updateAppointmentDto)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async remove(id) {
        const { data: appointment } = await this.supabaseService.supabase
            .from('appointments')
            .select('google_event_id, doctor_id')
            .eq('id', id)
            .single();
        if (appointment === null || appointment === void 0 ? void 0 : appointment.google_event_id) {
            const { data: tokens } = await this.supabaseService.supabase
                .from('google_tokens')
                .select('access_token, refresh_token')
                .eq('doctor_id', appointment.doctor_id)
                .single();
            if (tokens) {
                await this.googleCalendarService.deletEvent(tokens.access_token, tokens.refresh_token, appointment.google_event_id);
            }
        }
        const { error } = await this.supabaseService.supabase
            .from('appointments')
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return { message: 'Consulta removida com sucesso!' };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        google_calendar_service_1.GoogleCalendarService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map