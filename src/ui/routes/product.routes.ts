import express from 'express';
import { createProductcontroller } from '../controllers/product/create-product-controller';
import { findProductsController } from '../controllers/product/find-products-controller';
import { findProductByIdController } from '../controllers/product/find-product-by-id-controller';
import { updateProductController } from '../controllers/product/update-product-controller';
import { removeProductcontroller } from '../controllers/product/remove-product-controller';
import { authenticationMiddleware } from '../middlewares/authentication-middleware';

const productRouter = express.Router();

productRouter.get('/', findProductsController);
productRouter.get('/:productId', findProductByIdController);
productRouter.post('/', [authenticationMiddleware], createProductcontroller);
productRouter.patch('/:productId', updateProductController);
productRouter.delete('/:productId', [authenticationMiddleware], removeProductcontroller);

export default productRouter;
