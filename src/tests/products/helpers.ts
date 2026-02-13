import request from 'supertest';
import { app } from '../../ui/api';
import { faker } from '@faker-js/faker';

export const createRandomProduct = async () => {
    const newProductResponse = await request(app).post('/products').send({
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
    });

    return newProductResponse;
};
