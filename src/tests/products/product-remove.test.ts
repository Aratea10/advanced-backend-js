import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';
import { signupAndLogin } from '../authentication/helpers';

describe('DELETE /product/:productId', () => {
    test('Given no authorization header, endpoint should return a 401 status code', async () => {
        const response = await request(app).delete('/products/6979135412042d553e7a8313').send({
            name: 'test',
            description: 'test',
        });

        expect(response.status).toBe(401);
    });

    test('Given invalid authorization header, endpoint should return a 401 status code', async () => {
        const invalidToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
        const response = await request(app)
            .delete('/products/6979135412042d553e7a8313')
            .set('Authorization', invalidToken)
            .send({
                name: 'test',
                description: 'test',
            });

        expect(response.status).toBe(401);
    });

    test('Given a non existing product, return a 404 not found status code', async () => {
        const token = await signupAndLogin();
        const response = await request(app)
            .delete('/products/6979135412042d553e7a8313')
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(response.status).toBe(404);
    });

    test('Given an existing product, delete it', async () => {
        const { newProductResponse: randomProductResponse, token } = await createRandomProduct();
        const createdProduct = randomProductResponse.body.content;

        const removeProductResponse = await request(app)
            .delete(`/products/${createdProduct.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(removeProductResponse.status).toBe(200);

        const findProductResponse = await request(app).get(`/products/${createdProduct.id}`).send();

        expect(findProductResponse.status).toBe(404);
    });

    test('Given a user who is not the product owner, return a Forbidden operation error', async () => {
        const { newProductResponse: randomProductResponse } = await createRandomProduct();
        const createdProduct = randomProductResponse.body.content;
        const token = await signupAndLogin('another-user@domain.com', '1234567890');

        const removeProductResponse = await request(app)
            .delete(`/products/${createdProduct.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(removeProductResponse.status).toBe(404);
    });
});
