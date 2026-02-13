import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { RemoveProductUseCase } from './../../../domain/use-cases/product/remove-product-usecase';
import { Request, Response } from 'express';
import { productIdValidator } from './validators/productid-validator';

export const removeProductcontroller = async (request: Request, response: Response) => {
    const { productId } = productIdValidator.parse(request.params);

    const productMongoRepository = new ProductMongodbRepository();
    const removeProductUseCase = new RemoveProductUseCase(productMongoRepository);

    await removeProductUseCase.execute(productId, request.user?.id as string);
    response.json({
        message: 'Product removed succesful',
    });
};
