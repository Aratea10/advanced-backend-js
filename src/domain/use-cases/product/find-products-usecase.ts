import { ProductRepository } from '../../repositories/ProductRepository';
import { Pagination } from '../../types/Pagination';

export class FindProductsUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute({ page, limit }: Pagination) {
        const products = await this.productRepository.findMany({ page, limit });

        return products;
    }
}
