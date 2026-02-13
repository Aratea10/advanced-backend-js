import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user-usecase';
import { UserMongoRepository } from '../../../infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '../../../infrastructure/services/security-bcrypt-service';
import { authenticationBodyValidator } from './authentication-body-validator';

export const signupController = async (request: Request, response: Response) => {
    const { email, password } = authenticationBodyValidator.parse(request.body);

    const userMongoRepository = new UserMongoRepository();
    const securityBcryptService = new SecurityBcryptService();

    const createUserUseCase = new CreateUserUseCase(userMongoRepository, securityBcryptService);

    await createUserUseCase.execute({
        email: email,
        password: password,
    });

    response.status(201).json({
        content: 'Usuario registrado correctamente',
    });
};
