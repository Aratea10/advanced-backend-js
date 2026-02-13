import { ProductRepository } from './../../repositories/ProductRepository';
import { Product } from '../../entities/Product';

export class CreateProductUseCase {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute({ name, description }: { name: string; description: string }) {
        // hay que guardar el producto
        const createdProduct = await this.productRepository.createOne({
            name,
            description,
        });

        return createdProduct;
    }
}
