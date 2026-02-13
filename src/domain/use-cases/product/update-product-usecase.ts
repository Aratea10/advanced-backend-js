import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';
import { ProductUpdateQuery } from '../../types/product/ProductUpdateQuery';

export class UpdateProductUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(
        productId: string,
        query: ProductUpdateQuery,
        userId: string
    ): Promise<Product | null> {
        const productToUpdate = await this.productRepository.findById(productId);

        if (!productToUpdate) {
            throw new Error('product not found');
        }

        if (userId === productToUpdate.ownerId) {
            const createdProduct = await this.productRepository.updateOne(productId, query);

            return createdProduct;
        } else {
            throw new Error('Forbidden operation');
        }
    }
}
