import { NextFunction, Request, Response } from 'express';
import { SecurityBcryptService } from '../../infrastructure/services/security-bcrypt-service';
import { UnauthorizedError } from '../../domain/types/errors';

export const authenticationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // verificar si existe token cuando hacemos la petición al endpoint de creación de productos
    const authenticationHeader = request.headers.authorization; // Bearer eyfdfspdfnsf
    const token = authenticationHeader?.split(' ')[1];
    if (!token) {
        throw new UnauthorizedError(`Error getting jwt token from Authorization header`);
    }
    // verificar si el token es de confianza
    const securityService = new SecurityBcryptService();

    const data = securityService.verifyJWT(token);
    request.user = {
        id: data.userId,
    };

    next();
};
