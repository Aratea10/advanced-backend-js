import express from 'express';
import { Product } from './product';

const productRouter = express.Router();

productRouter.get('/', async (request, response) => {
    const products = await Product.find();

    response.json({ content: products });
});

productRouter.get('/:productId', async (request, response) => {
    const { productId } = request.params;

    const product = await Product.findById(productId);

    if (product) {
        response.json({ content: product });
    } else {
        response.status(404).json({
            message: 'Product not found',
        });
    }
});

productRouter.post('/', async (request, response) => {
    const { name, description } = request.body;

    if (!name || !description) {
        response.status(400).json({
            message: 'name and description have to be defined',
        });
    }

    const newProduct = new Product({
        name,
        description,
    });

    const productDb = await newProduct.save();

    response.status(201).json({
        content: productDb,
    });
});

productRouter.patch('/:productId', async (request, response) => {
    const { productId } = request.params;
    const { name, description } = request.body;

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, description },
        {
            new: true,
        },
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

    const deletedProduct = await Product.findByIdAndDelete(productId);

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
