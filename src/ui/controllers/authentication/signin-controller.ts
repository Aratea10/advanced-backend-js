import { Request, Response } from 'express';
import { UserMongoRepository } from '../../../infrastructure/repositories/user-mongo-repository';
import { SecurityBcryptService } from '../../../infrastructure/services/security-bcrypt-service';
import { LoginUserUseCase } from '../../../domain/use-cases/user/login-user-usecase';
import { authenticationBodyValidator } from './authentication-body-validator';

export const signinController = async (request: Request, response: Response) => {
    const { email, password } = authenticationBodyValidator.parse(request.body);

    const userMongoRepository = new UserMongoRepository();
    const securityBcryptService = new SecurityBcryptService();

    const loginUserUsecase = new LoginUserUseCase(userMongoRepository, securityBcryptService);

    const { token } = await loginUserUsecase.execute({
        email: email,
        password: password,
    });

    response.json({
        content: token,
    });
};
