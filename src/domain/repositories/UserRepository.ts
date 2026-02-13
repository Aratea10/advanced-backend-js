import { User } from '../entities/User';
import { UserCreationQuery } from '../types/user/UserCreationQuery';

export interface UserRepository {
    createOne(query: UserCreationQuery): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    find(): Promise<User[]>;
}
