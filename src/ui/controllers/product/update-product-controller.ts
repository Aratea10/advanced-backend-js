import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { UpdateProductUseCase } from './../../../domain/use-cases/product/update-product-usecase';
import { Request, Response } from 'express';
import * as z from 'zod';

const updateProductParamsValidator = z.object({
    productId: z.string(),
});

const updateProductBodyValidator = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).max(150).optional(),
});

const userRequestValidator = z.object({
    id: z.string(),
});

export const updateProductController = async (request: Request, response: Response) => {
    const { productId } = updateProductParamsValidator.parse(request.params);
    const { name, description } = updateProductBodyValidator.parse(request.body);
    const { id: userId } = userRequestValidator.parse(request.user);

    const productMongoDbRepository = new ProductMongodbRepository();
    const updateProductUseCase = new UpdateProductUseCase(productMongoDbRepository);

    const updatedProduct = await updateProductUseCase.execute(
        productId,
        {
            name,
            description,
        },
        userId
    );

    response.json({
        content: updatedProduct,
    });
};
