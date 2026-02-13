import { ProductRepository } from '../../repositories/ProductRepository';
import { ProductFindQuery } from '../../types/product/ProductFindQuery';

export class FindProductsUseCase {
    private readonly productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(query: ProductFindQuery) {
        const products = await this.productRepository.findMany({ ...query });

        return products;
    }
}
