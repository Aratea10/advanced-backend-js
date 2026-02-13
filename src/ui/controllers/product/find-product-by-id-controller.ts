import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { FindProductByIdUseCase } from './../../../domain/use-cases/product/find-product-by-id-usecase';
import { Request, Response } from 'express';
import { productIdValidator } from './validators/productid-validator';

export const findProductByIdController = async (request: Request, response: Response) => {
    const { productId } = productIdValidator.parse(request.params);

    const productMongoDbRepository = new ProductMongodbRepository();
    const findProductByIdUseCase = new FindProductByIdUseCase(productMongoDbRepository);

    const product = await findProductByIdUseCase.execute(productId);

    response.json({ content: product });
};
