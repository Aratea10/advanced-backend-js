import { Product } from '../../entities/Product';
import { EntityNotFoundError } from '../../types/errors';
import { ProductRepository } from './../../repositories/ProductRepository';
export class FindProductByIdUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(productId: string): Promise<Product | null> {
        const product = await this.productRepository.findById(productId);

        if (!product) {
            throw new EntityNotFoundError('Product', productId);
        }

        return product;
    }
}
