export interface SecurityService {
    hashPassword(password: string): Promise<string>;
}
