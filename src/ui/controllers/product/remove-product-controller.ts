import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { RemoveProductUseCase } from './../../../domain/use-cases/product/remove-product-usecase';
import { Request, Response } from 'express';

export const removeProductcontroller = async (request: Request, response: Response) => {
    const { productId } = request.params;

    const productMongoRepository = new ProductMongodbRepository();
    const removeProductUseCase = new RemoveProductUseCase(productMongoRepository);

    try {
        await removeProductUseCase.execute(productId as string, request.user?.id as string);
        response.json({
            message: 'Product removed succesful',
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        response.status(404).json({
            message: 'Product not found',
        });
    }
};
