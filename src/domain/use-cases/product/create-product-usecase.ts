import { ProductRepository } from './../../repositories/ProductRepository';
import { Product } from '../../entities/Product';

export class CreateProductUseCase {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute({ name, description }: { name: string; description: string }) {
        // todo lo relacionado con la creación de producto.

        // creación de Entidad producto (el de dominio)
        const newProduct = new Product({
            name,
            description,
        });

        // hay que guardar el producto
        await this.productRepository.createOne({
            name,
            description,
        });
    }
}
