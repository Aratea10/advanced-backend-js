import { SecurityService } from './../../services/SecurityService';
import { UserRepository } from '../../repositories/UserRepository';

export class LoginUserUseCase {
    private readonly userRepository: UserRepository;
    private readonly securityService: SecurityService;

    constructor(userRepository: UserRepository, securityService: SecurityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }

    async execute({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<{ token: string }> {
        // comprobar que el usuario existe en el sistema
        const existingUser = await this.userRepository.findByEmail(email);

        if (!existingUser) {
            throw new Error('El usuario no existe');
        }

        // comparar las constraseñas
        const arePasswordsEqual = await this.securityService.comparePasswords(
            password,
            existingUser.password
        );
        if (arePasswordsEqual) {
            // generar un jwt
            const token = this.securityService.generateJWT(existingUser);

            return {
                token,
            };
        } else {
            throw new Error('Contraseña errónea');
        }
    }
}
