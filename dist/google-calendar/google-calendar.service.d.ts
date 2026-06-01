export declare class GoogleCalendarService {
    private oauth2Client;
    constructor();
    getAuthUrl(doctorId: string): any;
    getToken(code: string): Promise<any>;
    createEvent(accessToken: string, refreshToken: string, event: {
        title: string;
        date: string;
        startTime: string;
        endTime: string;
        patientName: string;
        patientEmail: string;
    }): Promise<string>;
    deletEvent(accessToken: string, refreshToken: string, googleEventId: string): Promise<void>;
    listEvents(accessToken: string, refreshToken: string, timeMin: string, timeMax: string): Promise<import("googleapis").calendar_v3.Schema$Event[]>;
}
