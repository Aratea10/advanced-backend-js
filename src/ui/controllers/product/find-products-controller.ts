import { Request, Response } from 'express';
import { FindProductsUseCase } from '../../../domain/use-cases/product/find-products-usecase';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';

export const findProductsController = async (request: Request, response: Response) => {
    const productMongoDbRepository = new ProductMongodbRepository();
    const findProductsUseCase = new FindProductsUseCase(productMongoDbRepository);

    const products = await findProductsUseCase.execute();

    response.json({ content: products });
};
