import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
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
