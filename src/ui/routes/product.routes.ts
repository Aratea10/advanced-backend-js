import express from 'express';
import { createProductcontroller } from '../controllers/product/create-product-controller';
import { findProductsController } from '../controllers/product/find-products-controller';
import { findProductByIdController } from '../controllers/product/find-product-by-id-controller';
import { updateProductController } from '../controllers/product/update-product-controller';
import { removeProductcontroller } from '../controllers/product/remove-product-controller';

const productRouter = express.Router();

productRouter.get('/', findProductsController);
productRouter.get('/:productId', findProductByIdController);
productRouter.post('/', createProductcontroller);
productRouter.patch('/:productId', updateProductController);
productRouter.delete('/:productId', removeProductcontroller);

export default productRouter;
