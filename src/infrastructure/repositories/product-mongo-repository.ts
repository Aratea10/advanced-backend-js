import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductUpdateQuery } from '../../domain/types/product/ProductUpdateQuery';
import { ProductModel } from '../models/product-model';

export class ProductMongodbRepository implements ProductRepository {
    async createOne({ name, description }: { name: string; description: string }) {
        const newProduct = new ProductModel({
            name,
            description,
        });

        const createdProduct = await newProduct.save();

        return new Product({
            id: createdProduct._id.toString(),
            name: createdProduct.name,
            description: createdProduct.description,
            createdAt: createdProduct.createdAt,
        });
    }

    async findMany(): Promise<Product[]> {
        const mongoProducts = await ProductModel.find();

        return mongoProducts.map(
            mongoProduct =>
                new Product({
                    id: mongoProduct._id.toString(),
                    name: mongoProduct.name,
                    description: mongoProduct.description,
                    createdAt: mongoProduct.createdAt,
                })
        );
    }

    async findById(productId: string): Promise<Product | null> {
        const productDb = await ProductModel.findById(productId);

        if (!productDb) {
            return null;
        } else {
            return new Product({
                id: productDb._id.toString(),
                name: productDb.name,
                description: productDb.description,
                createdAt: productDb.createdAt,
            });
        }
    }

    async updateOne(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
        const updatedProduct = await ProductModel.findByIdAndUpdate(productId, query, {
            new: true,
        });

        if (!updatedProduct) {
            return null;
        } else {
            return new Product({
                id: updatedProduct._id.toString(),
                name: updatedProduct.name,
                description: updatedProduct.description,
                createdAt: updatedProduct.createdAt,
            });
        }
    }

    async removeById(productId: string): Promise<boolean> {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);

        return deletedProduct ? true : false;
    }
}
