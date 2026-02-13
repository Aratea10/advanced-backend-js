import { NextFunction, Request, Response } from 'express';
import { SecurityBcryptService } from '../../infrastructure/services/security-bcrypt-service';

export const authenticationMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    // verificar si existe token cuando hacemos la petición al endpoint de creación de productos
    const authenticationHeader = request.headers.authorization; // Bearer eyfdfspdfnsf
    const token = authenticationHeader?.split(' ')[1];
    if (!token) {
        response.status(401).json({
            message: 'Token not available',
        });
        return;
    }
    // verificar si el token es de confianza
    const securityService = new SecurityBcryptService();
    try {
        const data = securityService.verifyJWT(token);
        request.user = {
            id: data.userId,
        };
    } catch (error) {
        response.status(401).json({
            message: 'Token not valid',
        });
    }

    next();
};
