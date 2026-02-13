import { EmailService } from '../../domain/services/EmailService';
import { MailtrapClient } from 'mailtrap';
import { environmentService } from './environment-service';

export class MailtrapService implements EmailService {
    private readonly mailtrapClient: MailtrapClient;
    constructor() {
        const { MAILTRAP_TOKEN } = environmentService.get();
        this.mailtrapClient = new MailtrapClient({
            token: MAILTRAP_TOKEN,
        });
    }

    async sendEmail(email: string, message: string, subject: string): Promise<void> {
        await this.mailtrapClient.send({
            from: { name: 'Mailtrap Test', email: 'sandbox@example.com' },
            to: [{ email }],
            subject,
            text: message,
        });
    }
}

// https://www.npmjs.com/package/mailtrap
