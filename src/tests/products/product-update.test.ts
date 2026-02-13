import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';

describe('PATH /products/:productId', () => {
    test('given a non existing product, return a 404 not found', async () => {
        const response = await request(app).patch('/products/6979135412042d553e7a8313').send({});

        expect(response.status).toBe(404);
    });

    test('given an existing product, return a statuscode 200 and updated product', async () => {
        const createdProductResponse = await createRandomProduct();
        const createdProduct = createdProductResponse.body.content;
        const createdProductId = createdProductResponse.body.content.id;

        const updatedProductResponse = await request(app)
            .patch(`/products/${createdProductId}`)
            .send({ name: 'updated-product-name' });
        const updatedProduct = updatedProductResponse.body.content;

        expect(updatedProductResponse.status).toBe(200);
        expect(updatedProduct.name).toStrictEqual(updatedProduct.name);
        expect(updatedProduct.description).toStrictEqual(createdProduct.description);
    });
});
