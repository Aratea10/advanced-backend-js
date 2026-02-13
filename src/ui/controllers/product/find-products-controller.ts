import { Request, Response } from 'express';
import { FindProductsUseCase } from '../../../domain/use-cases/product/find-products-usecase';
import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import * as z from 'zod';
import { MailtrapService } from '../../../infrastructure/services/email-service';

const findProductsValidator = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number().max(100),
    search: z.string().min(3).optional(),
});

export const findProductsController = async (request: Request, response: Response) => {
    const { page, limit, search } = findProductsValidator.parse(request.query);

    const productMongoDbRepository = new ProductMongodbRepository();
    const findProductsUseCase = new FindProductsUseCase(productMongoDbRepository);

    const products = await findProductsUseCase.execute({ page, limit, name: search });

    response.json({ content: products });
};
