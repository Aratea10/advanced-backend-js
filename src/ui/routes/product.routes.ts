import express from 'express';
import { ProductModel } from '../../infrastructure/models/product-model';
import { createProductcontroller } from '../controllers/product/create-product-controller';
import { findProductsController } from '../controllers/product/find-products-controller';
import { findProductByIdController } from '../controllers/product/find-product-by-id-controller';
import { updateProductController } from '../controllers/product/update-product-controller';

const productRouter = express.Router();

productRouter.get('/', findProductsController);
productRouter.get('/:productId', findProductByIdController);
productRouter.post('/', createProductcontroller);
productRouter.patch('/:productId', updateProductController);

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
