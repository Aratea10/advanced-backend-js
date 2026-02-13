import { environmentService } from './environment-service';
import bcrypt from 'bcryptjs';
import { SecurityService } from '../../domain/services/SecurityService';
import { User } from '../../domain/entities/User';
import jwt from 'jsonwebtoken';

export class SecurityBcryptService implements SecurityService {
    private readonly jwtSecret: string;

    constructor() {
        const { JWT_SECRET } = environmentService.get();
        this.jwtSecret = JWT_SECRET;
    }
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }

    async comparePasswords(incomingPassword: string, userPassword: string) {
        const isMatch = await bcrypt.compare(incomingPassword, userPassword);

        return isMatch;
    }

    generateJWT(user: User): string {
        const token = jwt.sign({ userId: user.id }, this.jwtSecret, {
            expiresIn: '1h',
        });

        return token;
    }

    verifyJWT(token: string): { userId: string } {
        const data = jwt.verify(token, this.jwtSecret) as { userId: string };

        return data;
    }
}
