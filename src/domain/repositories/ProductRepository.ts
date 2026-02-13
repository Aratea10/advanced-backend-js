import { Product } from '../entities/Product';
import { Pagination } from '../types/Pagination';
import { ProductCreationQuery } from '../types/product/ProductCreationQuery';
import { ProductUpdateQuery } from '../types/product/ProductUpdateQuery';

export interface ProductRepository {
    createOne(query: ProductCreationQuery): Promise<Product>;
    findMany(query: Pagination): Promise<Product[]>;
    findById(productId: string): Promise<Product | null>;
    updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null>;
    removeById(productId: string): Promise<boolean>;
}
