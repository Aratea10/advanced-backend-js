import { DomainError } from './DomainError';

export class ForbiddenOperationError extends DomainError {
    readonly name = 'ForbiddenOperationError';
    constructor(message = 'operation not allowed') {
        super(message);
    }
}
