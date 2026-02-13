import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { Request, Response } from 'express';
import { CreateProductUseCase } from '../../../domain/use-cases/product/create-product-usecase';

export const createProductcontroller = async (request: Request, response: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, description } = request.body;

    if (!name || !description) {
        response.status(400).json({
            message: 'name and description have to be defined',
        });
    }

    // desencadenar toda la lógica de creación de producto
    const productMongodbRepository = new ProductMongodbRepository();
    // const productMemoryRepository = new ProductMemoryRepository();
    const createProductUseCase = new CreateProductUseCase(productMongodbRepository);

    const createdProduct = await createProductUseCase.execute({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        name,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        description,
        userId: request.user?.id ?? '',
    });

    response.status(201).json({
        content: createdProduct,
    });
};
