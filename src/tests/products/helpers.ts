import request from 'supertest';
import { app } from '../../ui/api';
import { faker } from '@faker-js/faker';
import { signupAndLogin } from '../authentication/helpers';

export const createRandomProduct = async () => {
    const token = await signupAndLogin();
    const newProductResponse = await request(app)
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: faker.commerce.product(),
            description: faker.commerce.productDescription(),
        });

    return { newProductResponse, token };
};
