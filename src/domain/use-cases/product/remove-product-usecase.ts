import { ProductRepository } from '../../repositories/ProductRepository';
import { EntityNotFoundError, ForbiddenOperationError } from '../../types/errors';

export class RemoveProductUseCase {
    readonly productRepository: ProductRepository;
    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(productId: string, userId: string) {
        // es el usuario que hace la petición
        // el mismo que ha creado el producto?
        // sí -> lo borro
        // no -> Error

        // necesitamos el product que tenemos que borrar de la db
        const productToRemove = await this.productRepository.findById(productId);
        if (!productToRemove) {
            throw new EntityNotFoundError('Product', productId);
        }

        if (userId === productToRemove.ownerId) {
            // borramos
            const isRemoved = await this.productRepository.removeById(productId);

            if (!isRemoved) {
                throw new EntityNotFoundError('Product', productId);
            }
        } else {
            throw new ForbiddenOperationError('Only owners can remove their products');
        }
    }
}
