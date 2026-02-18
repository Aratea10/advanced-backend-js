import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductCreationQuery } from '../../domain/types/product/ProductCreationQuery';
import { ProductFindQuery } from '../../domain/types/product/ProductFindQuery';
import { ProductUpdateQuery } from '../../domain/types/product/ProductUpdateQuery';

export class ProductMemoryRepository implements ProductRepository {
    readonly products: Product[] = [];

    async createOne({ name, description, userId }: ProductCreationQuery): Promise<Product> {
        const product = new Product({
            name,
            description,
            id: Date.now().toString(),
            ownerId: userId,
            createdAt: new Date(),
        });

        this.products.push(product);
        return product;
    }

    async findMany({ page, limit, name }: ProductFindQuery): Promise<Product[]> {
        let filtered = this.products;
        if (name) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        }
        const skip = (page - 1) * limit;
        return filtered.slice(skip, skip + limit);
    }

    async findById(productId: string): Promise<Product | null> {
        return this.products.find(p => p.id === productId) ?? null;
    }

    async updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) return null;

        const existing = this.products[index];
        const updated = new Product({
            id: existing.id,
            ownerId: existing.ownerId,
            name: query.name ?? existing.name,
            description: query.description ?? existing.description,
            createdAt: existing.createdAt,
        });

        this.products[index] = updated;
        return updated;
    }

    async removeById(productId: string): Promise<boolean> {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) return false;
        this.products.splice(index, 1);
        return true;
    }
}
