import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    loginDoctor(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        doctor: any;
    }>;
    loginPatient(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
        patient: any;
    }>;
    getGoogleAuthUrl(doctorId: string): any;
    handleGoogleCallback(code: string, doctorId: string): Promise<{
        message: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        email: string;
        code: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
}
