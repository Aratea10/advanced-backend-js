import { UserRepository } from '../../repositories/UserRepository';
import { UserCreationQuery } from '../../types/user/UserCreationQuery';
import { SecurityService } from '../../services/SecurityService';

export class CreateUserUseCase {
    private readonly userRepository: UserRepository;
    private readonly securityService: SecurityService;
    constructor(userRepository: UserRepository, securityService: SecurityService) {
        this.userRepository = userRepository;
        this.securityService = securityService;
    }

    async execute(query: UserCreationQuery) {
        // hay que comprobar que el usuario no exista
        const user = await this.userRepository.findByEmail(query.email);

        if (user) {
            throw new Error('El usuario ya existe');
        }

        // hay que hashear la contraseña
        const hashedPassword = await this.securityService.hashPassword(query.password);

        // hay que crear el usuario
        const createdUser = await this.userRepository.createOne({
            email: query.email,
            password: hashedPassword,
        });

        return createdUser;
    }
}
