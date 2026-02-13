import express from 'express';
import { ProductModel } from '../../infrastructure/models/product-model';
import { createProductcontroller } from '../controllers/product/create-product-controller';
import { findProductsController } from '../controllers/product/find-products-controller';

const productRouter = express.Router();

productRouter.get('/', findProductsController);

productRouter.get('/:productId', async (request, response) => {
    const { productId } = request.params;

    const product = await ProductModel.findById(productId);

    if (product) {
        response.json({ content: product });
    } else {
        response.status(404).json({
            message: 'Product not found',
        });
    }
});

productRouter.post('/', createProductcontroller);

productRouter.patch('/:productId', async (request, response) => {
    const { productId } = request.params;
    const { name, description } = request.body;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { name, description },
        {
            new: true,
        }
    );

    if (!updatedProduct) {
        response.status(404).json({
            message: 'Product not found',
        });
    } else {
        response.json({
            content: updatedProduct,
        });
    }
});

productRouter.delete('/:productId', async (request, response) => {
    const { productId } = request.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
        response.status(404).json({
            message: 'Product not found',
        });
    } else {
        response.json({
            message: 'Product removed succesful',
        });
    }
});

export default productRouter;
