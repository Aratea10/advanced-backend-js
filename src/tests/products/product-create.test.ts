import request from 'supertest';
import { app } from '../../api';

describe('POST /products/:id', () => {
    test('Given no name or description, endpoint should return a 400 error', async () => {
        const response = await request(app).post('/products').send({
            name: 'test',
        });

        expect(response.status).toBe(400);
    });

    test('When data is right, product should be created', async () => {
        const response = await request(app).post('/products').send({
            name: 'test',
            description: 'description',
        });

        expect(response.status).toBe(201);
    });
});
