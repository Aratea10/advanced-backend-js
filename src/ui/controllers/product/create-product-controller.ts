import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../domain/use-cases/product/create-product-usecase';
import * as z from 'zod';

const createProductBodyValidator = z.object({
    name: z.string().min(3),
    description: z.string().min(10).max(150),
});

export const createProductcontroller = async (request: Request, response: Response) => {
    const { name, description } = createProductBodyValidator.parse(request.body);

    // desencadenar toda la lógica de creación de producto
    const productMongodbRepository = new ProductMongodbRepository();
    // const productMemoryRepository = new ProductMemoryRepository();
    const createProductUseCase = new CreateProductUseCase(productMongodbRepository);

    const createdProduct = await createProductUseCase.execute({
        name,
        description,
        userId: request.user?.id ?? '',
    });

    response.status(201).json({
        content: createdProduct,
    });
};
