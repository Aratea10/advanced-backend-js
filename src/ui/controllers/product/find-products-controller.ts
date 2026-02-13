import { Request, Response } from 'express';
import { FindProductsUseCase } from '../../../domain/use-cases/product/find-products-usecase';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import * as z from 'zod';

const findProductsValidator = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number().max(100),
});

export const findProductsController = async (request: Request, response: Response) => {
    const { page, limit } = findProductsValidator.parse(request.query);

    const productMongoDbRepository = new ProductMongodbRepository();
    const findProductsUseCase = new FindProductsUseCase(productMongoDbRepository);

    const products = await findProductsUseCase.execute({ page, limit });

    response.json({ content: products });
};
