import { Product } from '../entities/Product';
import { ProductUpdateQuery } from '../types/product/ProductUpdateQuery';

export interface ProductRepository {
    createOne({ name, description }: { name: string; description: string }): Promise<Product>;
    findMany(): Promise<Product[]>;
    findById(productId: string): Promise<Product | null>;
    updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null>;
}
