import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
export declare class AppointmentsService {
    private readonly supabaseService;
    private readonly googleCalendarService;
    constructor(supabaseService: SupabaseService, googleCalendarService: GoogleCalendarService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<any>;
    findAll(): Promise<any[]>;
    findByDoctor(doctorId: string): Promise<any[]>;
    findByPatient(patientId: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
