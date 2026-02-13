import { Request, Response } from 'express';
import { UserMongoRepository } from '../../../infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '../../../infrastructure/services/security-bcrypt-service';
import { LoginUserUseCase } from '../../../domain/use-cases/user/login-user-usecase';

export const signinController = async (request: Request, response: Response) => {
    const email = request.body.email;
    const password = request.body.password;

    if (!email || !password) {
        response.status(400).json({
            content: 'email y password son obligatorios',
        });
    }

    const userMongoRepository = new UserMongoRepository();
    const securityBcryptService = new SecurityBcryptService();

    const loginUserUsecase = new LoginUserUseCase(userMongoRepository, securityBcryptService);

    try {
        const { token } = await loginUserUsecase.execute({
            email: email as string,
            password: password as string,
        });

        response.json({
            content: token,
        });
    } catch (error) {
        response.status(400).json({
            content: 'Login error: ',
            error,
        });
    }
};
