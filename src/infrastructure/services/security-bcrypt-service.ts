import { environmentService } from './environment-service';
import bcrypt from 'bcryptjs';
import { SecurityService } from '../../domain/services/SecurityService';
import { User } from '../../domain/entities/User';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../../domain/types/errors';

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

        if (!isMatch) {
            throw new UnauthorizedError('Password is not valid');
        }

        return isMatch;
    }

    generateJWT(user: User): string {
        try {
            const token = jwt.sign({ userId: user.id }, this.jwtSecret, {
                expiresIn: '1h',
            });

            return token;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'jwt.sign error';
            throw new UnauthorizedError(`Error generating JWT: ${errorMessage}`);
        }
    }

    verifyJWT(token: string): { userId: string } {
        try {
            const data = jwt.verify(token, this.jwtSecret) as { userId: string };
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'jwt.verify error';
            throw new UnauthorizedError(`Error verifying JWT: ${errorMessage}`);
        }
    }
}
