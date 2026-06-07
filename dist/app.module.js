"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_module_1 = require("./supabase/supabase.module");
const google_calendar_module_1 = require("./google-calendar/google-calendar.module");
const doctors_module_1 = require("./doctors/doctors.module");
const patients_module_1 = require("./patients/patients.module");
const auth_module_1 = require("./auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const mail_module_1 = require("./mail/mail.module");
const appointments_module_1 = require("./appointments/appointments.module");
const guardians_module_1 = require("./guardians/guardians.module");
const doctor_patients_module_1 = require("./doctor-patients/doctor-patients.module");
const access_codes_module_1 = require("./access-codes/access-codes.module");
const evolutions_module_1 = require("./evolutions/evolutions.module");
const evolution_blocks_module_1 = require("./evolution-blocks/evolution-blocks.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', 'Secret.env'] }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
            supabase_module_1.SupabaseModule,
            google_calendar_module_1.GoogleCalendarModule,
            auth_module_1.AuthModule,
            doctors_module_1.DoctorsModule,
            patients_module_1.PatientsModule,
            mail_module_1.MailModule,
            appointments_module_1.AppointmentsModule,
            guardians_module_1.GuardiansModule,
            doctor_patients_module_1.DoctorPatientsModule,
            access_codes_module_1.AccessCodesModule,
            evolutions_module_1.EvolutionsModule,
            evolution_blocks_module_1.EvolutionBlocksModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map