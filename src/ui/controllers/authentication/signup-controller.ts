import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../domain/use-cases/user/create-user-usecase';
import { UserMongoRepository } from '../../../infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '../../../infrastructure/services/security-bcrypt-service';

export const signupController = async (request: Request, response: Response) => {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        response.status(400).json({
            content: 'email y password son obligatorios',
        });
    }

    const userMongoRepository = new UserMongoRepository();
    const securityBcryptService = new SecurityBcryptService();

    const createUserUseCase = new CreateUserUseCase(userMongoRepository, securityBcryptService);

    try {
        await createUserUseCase.execute({
            email: email as string,
            password: password as string,
        });
    } catch (error) {
        response.status(409).json({
            content: 'El usuario ya existe',
        });
    }

    response.status(201).json({
        content: 'Usuario registrado correctamente',
    });
};
