import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) { }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentsService.create(createAppointmentDto);
    }

    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.appointmentsService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get('doctor/:doctorId')
    findByDoctor(@Param('doctorId') doctorId: string) {
        return this.appointmentsService.findByDoctor(doctorId);
    }

    @UseGuards(JwtGuard)
    @Get('patient/:patientId')
    findByPatient(@Param('patientId') patientId: string) {
        return this.appointmentsService.findByPatient(patientId);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.appointmentsService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.appointmentsService.update(id, updateAppointmentDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.appointmentsService.remove(id);
    }

}
