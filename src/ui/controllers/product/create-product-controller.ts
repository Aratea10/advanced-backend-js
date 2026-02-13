import { ProductMongodbRepository } from './../../../infrastructure/repositories/product-repository';
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
    const createProductUseCase = new CreateProductUseCase(productMongodbRepository);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const createdProduct = await createProductUseCase.execute({ name, description });

    response.status(201).json({
        content: createdProduct,
    });
};
