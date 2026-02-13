import request from 'supertest';
import { app } from '../../api';

describe('DELETE /product/:productId', () => {
    test('Given a non existing product, return a 404 not found status code', async () => {
        const response = await request(app).delete('/products/6979135412042d553e7a8313').send();

        expect(response.status).toBe(404);
    });

    test('Given an existing product, delete it', async () => {
        const newProductResponse = await request(app).post('/products').send({
            name: 'product1',
            description: 'random description',
        });
        const createdProduct = newProductResponse.body.content;

        const removeProductResponse = await request(app)
            .delete(`/products/${createdProduct._id}`)
            .send();

        expect(removeProductResponse.status).toBe(200);

        const findProductResponse = await request(app).get(`/products/${createdProduct._id}`).send();

        expect(findProductResponse.status).toBe(404);
    });
});
