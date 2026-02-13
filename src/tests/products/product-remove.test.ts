import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';

describe('DELETE /product/:productId', () => {
    test('Given a non existing product, return a 404 not found status code', async () => {
        const response = await request(app).delete('/products/6979135412042d553e7a8313').send();

        expect(response.status).toBe(404);
    });

    test('Given an existing product, delete it', async () => {
        const randomProductResponse = await createRandomProduct();
        const createdProduct = randomProductResponse.body.content;

        const removeProductResponse = await request(app)
            .delete(`/products/${createdProduct.id}`)
            .send();

        expect(removeProductResponse.status).toBe(200);

        const findProductResponse = await request(app).get(`/products/${createdProduct.id}`).send();

        expect(findProductResponse.status).toBe(404);
    });
});
