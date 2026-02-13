import { ProductRepository } from '../../repositories/ProductRepository';

export class FindProductsUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute() {
        const products = await this.productRepository.findMany();

        return products;
    }
}
