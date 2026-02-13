export interface EmailService {
    sendEmail(email: string, message: string, subject: string): Promise<void>;
}
