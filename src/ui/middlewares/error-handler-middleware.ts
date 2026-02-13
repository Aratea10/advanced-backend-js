import { NextFunction, Request, Response } from 'express';
import { status } from 'http-status';
import { DomainError } from '../../domain/types/errors/DomainError';
import * as zod from 'zod';

const domainErrorToHttpStatusCode: Record<string, number> = {
    EntityNotFoundError: status.NOT_FOUND,
    UnauthorizedError: status.UNAUTHORIZED,
    BusinessConflictError: status.CONFLICT,
    ForbiddenOperationError: status.FORBIDDEN,
};

export const errorHandlerMiddleware = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof DomainError) {
        const statusCode = domainErrorToHttpStatusCode[error.name];
        response.status(statusCode).json({ message: error.message });
    }

    if (error instanceof zod.ZodError) {
        const errorMessage = zod.flattenError(error).fieldErrors;
        response.status(status.BAD_REQUEST).json({ message: errorMessage });
    }

    response.status(status.INTERNAL_SERVER_ERROR).json({
        message: JSON.stringify(error),
    });
};
