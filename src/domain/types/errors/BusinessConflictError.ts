import { DomainError } from './DomainError';

export class BusinessConflictError extends DomainError {
    readonly name = 'BusinessConflictError';
    constructor(message = 'conflict') {
        super(message);
    }
}
