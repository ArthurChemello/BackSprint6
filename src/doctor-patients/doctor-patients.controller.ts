import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorPatientsService } from './doctor-patients.service';
import { CreateDoctorPatientDto } from './dto/create-doctor-patient.dto';
import { UpdateDoctorPatientDto } from './dto/update-doctor-patient.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('doctor-patients')
export class DoctorPatientsController {
    constructor(private readonly doctorPatientsService: DoctorPatientsService) { }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() createDoctorPatientDto: CreateDoctorPatientDto) {
        return this.doctorPatientsService.create(createDoctorPatientDto);
    }

    @UseGuards(JwtGuard)
    @Get('doctor/:doctorId')
    findByDoctor(@Param('doctorId') doctorId: string) {
        return this.doctorPatientsService.findByDoctor(doctorId);
    }

    @UseGuards(JwtGuard)
    @Get('patient/:patientId')
    findByPatient(@Param('patientId') patientId: string) {
        return this.doctorPatientsService.findByPatient(patientId);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDoctorPatientDto: UpdateDoctorPatientDto) {
        return this.doctorPatientsService.update(id, updateDoctorPatientDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.doctorPatientsService.remove(id);
    }

    //buscar paciente e médico por nome, fazer a busca de forma com nome errado e retornar pessoas com nome igual(todas);
}
