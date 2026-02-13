import { Product } from '../entities/Product';

export interface ProductRepository {
    createOne({ name, description }: { name: string; description: string }): Promise<Product>;
}
