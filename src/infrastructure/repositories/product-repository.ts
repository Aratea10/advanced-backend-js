import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductModel } from '../../product';

export class ProductMongodbRepository implements ProductRepository {
    async createOne({ name, description }: { name: string; description: string }) {
        const newProduct = new ProductModel({
            name,
            description,
        });

        await newProduct.save();
    }
}
