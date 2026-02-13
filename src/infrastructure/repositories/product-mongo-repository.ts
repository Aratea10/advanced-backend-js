import { QueryFilter } from 'mongoose';
import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductCreationQuery } from '../../domain/types/product/ProductCreationQuery';
import { ProductFindQuery } from '../../domain/types/product/ProductFindQuery';
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

    async findMany({ page, limit, name, ownerId }: ProductFindQuery): Promise<Product[]> {
        const searchQuery: QueryFilter<ProductMongoDb> = {};

        if (name) {
            searchQuery.name = {
                $regex: name,
                $options: 'i',
            };
        }

        if (ownerId) {
            searchQuery.ownerId = {
                $eq: ownerId,
            };
        }

        const skip = (page - 1) * limit;

        const mongoProducts = await ProductModel.find(searchQuery).skip(skip).limit(limit);

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
