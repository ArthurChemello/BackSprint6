import { Injectable } from "@nestjs/common";
import { google } from 'googleapis';

@Injectable()
export class GoogleCalendarService {
    private oauth2Client;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
        );
    }

    getAuthUrl(doctorId: string) {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
        });
    }

    async getToken(code: string) {
        const { tokens } = await this.oauth2Client.getToken(code);
        return tokens;
    }

    async createEvent(accessToken: string, refreshToken: string, event: {
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        patientName: string;
        patientEmail: string;
    }) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

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
                        { method: 'email', minutes: 1440 }, // 24 horas antes
                        { method: 'email', minutes: 60 },   // 1 hora antes
                        { method: 'email', minutes: 30 },   // 30 minutos antes
                    ],
                },
            },
        });

        return response.data.id;
    }

    async deletEvent(accessToken: string, refreshToken: string, googleEventId: string) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

        await calendar.events.delete({
            calendarId: 'primary',
            eventId: googleEventId,
        });
    }

    async listEvents(accessToken: string, refreshToken: string, timeMin: string, timeMax: string) {
        this.oauth2Client.setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
        });

        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin,
            timeMax,
            singleEvents: true,
            orderBy: 'startTime',
        });

        return response.data.items;
    }
}