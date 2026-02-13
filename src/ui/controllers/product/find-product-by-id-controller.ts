import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { FindProductByIdUseCase } from './../../../domain/use-cases/product/find-product-by-id-usecase';
import { Request, Response } from 'express';

export const findProductByIdController = async (request: Request, response: Response) => {
    let { productId } = request.params;

    if (Array.isArray(productId)) {
        productId = productId[0];
    }

    const productMongoDbRepository = new ProductMongodbRepository();
    const findProductByIdUseCase = new FindProductByIdUseCase(productMongoDbRepository);

    const product = await findProductByIdUseCase.execute(productId);

    if (product) {
        response.json({ content: product });
    } else {
        response.status(404).json({
            message: 'Product not found',
        });
    }
};
