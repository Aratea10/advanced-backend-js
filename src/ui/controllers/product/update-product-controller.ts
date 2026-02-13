import { ProductMongodbRepository } from '../../../infrastructure/repositories/product-mongo-repository';
import { UpdateProductUseCase } from './../../../domain/use-cases/product/update-product-usecase';
import { Request, Response } from 'express';

export const updateProductController = async (request: Request, response: Response) => {
    const { productId } = request.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, description }: { name: string; description: string } = request.body;

    const productMongoDbRepository = new ProductMongodbRepository();
    const updateProductUseCase = new UpdateProductUseCase(productMongoDbRepository);

    try {
        const updatedProduct = await updateProductUseCase.execute(
            productId as string,
            {
                name,
                description,
            },
            request.user?.id ?? ''
        );
        response.json({
            content: updatedProduct,
        });
    } catch (error) {
        response.status(404).json({
            message: 'Product not found',
        });
    }
};
