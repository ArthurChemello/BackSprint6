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
exports.GoogleCalendarService = void 0;
const common_1 = require("@nestjs/common");
const googleapis_1 = require("googleapis");
let GoogleCalendarService = class GoogleCalendarService {
    constructor() {
        this.oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI);
    }
    getAuthUrl(doctorId) {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
            state: doctorId,
        });
    }
    async getToken(code) {
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
    }
    async createEvent(accessToken, refreshToken, event) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: {
                summary: `${event.title} - ${event.patientName}`,
                start: {
                    dateTime: `${event.date}T${event.startTime}:00`,
                    timeZone: 'America/Sao_Paulo',
                },
                end: {
                    dateTime: `${event.date}T${event.endTime}:00`,
                    timeZone: 'America/Sao_Paulo',
                },
                attendees: [
                    { email: event.patientEmail }
                ],
                guestsCanSeeOtherGuests: false,
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 1440 },
                        { method: 'email', minutes: 60 },
                        { method: 'email', minutes: 30 },
                    ],
                },
            },
        });
        return response.data.id;
    }
    async deletEvent(accessToken, refreshToken, googleEventId) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: googleEventId,
        });
    }
    async listEvents(accessToken, refreshToken, timeMin, timeMax) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });
        const calendar = googleapis_1.google.calendar({ version: 'v3', auth: this.oauth2Client });
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: 'startTime',
        });
        return response.data.items;
    }
};
exports.GoogleCalendarService = GoogleCalendarService;
exports.GoogleCalendarService = GoogleCalendarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GoogleCalendarService);
//# sourceMappingURL=google-calendar.service.js.map