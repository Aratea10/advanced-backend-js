import { ProductCreationQuery } from '../../types/product/ProductCreationQuery';
import { ProductRepository } from './../../repositories/ProductRepository';

export class CreateProductUseCase {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute({ name, description, userId }: ProductCreationQuery) {
        // hay que guardar el producto
        const createdProduct = await this.productRepository.createOne({
            name,
            description,
            userId,
        });

        return createdProduct;
    }
}
