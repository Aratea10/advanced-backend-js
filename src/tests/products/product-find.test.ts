import request from 'supertest';
import { app } from '../../ui/api';
import { createRandomProduct } from './helpers';

describe('GET /products/:id', () => {
    test('Should return a 404 if product does not exist', async () => {
        const response = await request(app).get('/products/6979135412042d553e7a8313').send();

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({
            message: 'Product not found',
        });
    });

    test('Given an existing product, return it', async () => {
        // tengo que crear un producto y guardarme su id
        const { newProductResponse } = await createRandomProduct();

        const createdProduct = newProductResponse.body.content;
        const productId = createdProduct.id;
        // petición de ese producto
        const response = await request(app).get(`/products/${productId}`).send();

        // comprobar que el API me devuelve ese producto
        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            content: {
                name: createdProduct.name,
                description: createdProduct.description,
            },
        });
    });
});

describe('GET /products', () => {
    test('Should return a list of products', async () => {
        const emptyResponse = await request(app).get('/products').send();
        expect(emptyResponse.body.content.length).toBe(0);

        await createRandomProduct();
        await createRandomProduct();

        const response = await request(app).get('/products').send();

        expect(response.body.content.length).toBe(2);
    });

    test('Should return an empty array when there are no products', async () => {
        const response = await request(app).get('/products').send();

        expect(response.body.content.length).toBe(0);
    });
});
