import { Product } from '../../entities/Product';
import { ProductRepository } from '../../repositories/ProductRepository';
import { ProductUpdateQuery } from '../../types/product/ProductUpdateQuery';

export class UpdateProductUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(productId: string, query: ProductUpdateQuery): Promise<Product | null> {
        const createdProduct = await this.productRepository.updateOne(productId, query);

        return createdProduct;
    }
}
