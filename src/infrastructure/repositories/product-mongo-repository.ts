import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductCreationQuery } from '../../domain/types/product/ProductCreationQuery';
import { ProductUpdateQuery } from '../../domain/types/product/ProductUpdateQuery';
import { ProductModel, ProductMongoDb } from '../models/product-model';

export class ProductMongodbRepository implements ProductRepository {
    async createOne({ name, description, userId }: ProductCreationQuery) {
        const newProduct = new ProductModel({
            name,
            description,
            ownerId: userId,
        });

        const createdProduct = await newProduct.save();

        return this.restoreProduct(createdProduct);
    }

    async findMany(): Promise<Product[]> {
        const mongoProducts = await ProductModel.find();

        return mongoProducts.map(mongoProduct => this.restoreProduct(mongoProduct));
    }

    async findById(productId: string): Promise<Product | null> {
        const productDb = await ProductModel.findById(productId);

        if (!productDb) {
            return null;
        } else {
            return this.restoreProduct(productDb);
        }
    }

    async updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, query, {
            new: true,
        });

        if (!updatedProduct) {
            return null;
        } else {
            return this.restoreProduct(updatedProduct);
        }
    }

    async removeById(productId: string): Promise<boolean> {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        return deletedProduct ? true : false;
    }

    private restoreProduct(productDb: ProductMongoDb): Product {
        return new Product({
            id: productDb._id.toString(),
            ownerId: productDb.ownerId.toString(),
            name: productDb.name,
            description: productDb.description,
            createdAt: productDb.createdAt,
        });
    }
}
