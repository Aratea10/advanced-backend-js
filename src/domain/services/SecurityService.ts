import { User } from '../entities/User';

export interface SecurityService {
    hashPassword(password: string): Promise<string>;
    comparePasswords(incomingPassword: string, userPassword: string): Promise<boolean>;
    generateJWT(user: User): string;
    verifyJWT(token: string): { userId: string };
}
