import { ProductRepository } from '../../repositories/ProductRepository';

export class RemoveProductUseCase {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(productId: string) {
        const isRemoved = await this.productRepository.removeById(productId);

        if (!isRemoved) {
            throw new Error('Product can not be removed');
        }
    }
}
