import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class ProductMemoryRepository implements ProductRepository {
    readonly products: Product[];

    constructor() {
        this.products = [];
    }
    createOne({ name, description }: { name: string; description: string }): Promise<Product> {
        const product = new Product({
            name,
            description,
            id: Date.now.toString(),
            createdAt: new Date(),
        });

        this.products.push(product);

        return Promise.resolve(product);
    }
}
