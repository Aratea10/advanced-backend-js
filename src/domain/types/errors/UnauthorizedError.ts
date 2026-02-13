import { DomainError } from './DomainError';

export class UnauthorizedError extends DomainError {
    readonly name = 'UnauthorizedError';
    constructor(message = 'unauthorized error') {
        super(message);
    }
}
