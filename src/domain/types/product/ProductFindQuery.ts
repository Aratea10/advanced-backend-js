import { Pagination } from '../Pagination';

export interface ProductFindQuery extends Pagination {
    name?: string;
    ownerId?: string;
}
