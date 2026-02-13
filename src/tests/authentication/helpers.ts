import request from 'supertest';
import { app } from '../../ui/api';

export const signupAndLogin = async (
    email: string = 'some-email@domain.com',
    password: string = 'some-password'
) => {
    await request(app).post('/authentication/signup').send({ email, password });

    const loginResponse = await request(app).post('/authentication/signin').send({ email, password });
    return loginResponse.body.content as string;
};
