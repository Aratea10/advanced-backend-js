import { Product } from '../entities/Product';
import { ProductCreationQuery } from '../types/product/ProductCreationQuery';
import { ProductUpdateQuery } from '../types/product/ProductUpdateQuery';

export interface ProductRepository {
    createOne(query: ProductCreationQuery): Promise<Product>;
    findMany(): Promise<Product[]>;
    findById(productId: string): Promise<Product | null>;
    updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null>;
    removeById(productId: string): Promise<boolean>;
}
