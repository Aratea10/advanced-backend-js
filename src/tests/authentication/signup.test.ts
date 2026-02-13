import request from 'supertest';
import { app } from '../../ui/api';
import { faker } from '@faker-js/faker';

describe('POST /authentication/signup', () => {
    test('Email and password should be mandatory', async () => {
        const response = await request(app).post('/authentication/signup').send();

        expect(response.status).toBe(400);
    });

    test('Email should be unique', async () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        const firstAttemptResponse = await request(app).post('/authentication/signup').send({
            email,
            password,
        });

        expect(firstAttemptResponse.status).toBe(201);

        const secondAttemptResponse = await request(app).post('/authentication/signup').send({
            email,
            password,
        });

        expect(secondAttemptResponse.status).toBe(409);
    });

    test('Given a valid email and password, a new user should be created', async () => {
        const email = faker.internet.email();
        const password = faker.internet.password();

        const newUserResponse = await request(app).post('/authentication/signup').send({
            email,
            password,
        });

        expect(newUserResponse.status).toBe(201);
    });
});
