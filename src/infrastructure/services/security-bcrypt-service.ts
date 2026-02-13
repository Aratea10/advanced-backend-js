import bcrypt from 'bcryptjs';
import { SecurityService } from '../../domain/services/SecurityService';

export class SecurityBcryptService implements SecurityService {
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}
