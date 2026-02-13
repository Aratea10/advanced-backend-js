import request from 'supertest';
import { app } from '../../ui/api';
import { signupAndLogin } from '../authentication/helpers';

describe('POST /products/:id', () => {
    test('Given no authorization header, endpoint should return a 401 status code', async () => {
        const response = await request(app).post('/products').send({
            name: 'test',
            description: 'test',
        });

        expect(response.status).toBe(401);
    });

    test('Given invalid authorization header, endpoint should return a 401 status code', async () => {
        const invalidToken =
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30';
        const response = await request(app).post('/products').set('Authorization', invalidToken).send({
            name: 'test',
            description: 'test',
        });

        expect(response.status).toBe(401);
    });

    test('Given no name or description, endpoint should return a 400 error', async () => {
        const token = await signupAndLogin();

        const response = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
            });

        expect(response.status).toBe(400);
    });

    test('When data is right, product should be created', async () => {
        const token = await signupAndLogin();

        const response = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'test',
                description: 'description',
            });

        expect(response.status).toBe(201);
        expect(response.body.content.createdAt).toBeDefined();
    });
});
