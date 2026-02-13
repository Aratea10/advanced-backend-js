/* eslint-disable @typescript-eslint/no-namespace */
import express from 'express';
import productRouter from './routes/product-routes';
import authenticationRouter from './routes/authentication-routes';
import { environmentService } from '../infrastructure/services/environment-service';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
            };
        }
    }
}

export const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/authentication', authenticationRouter);

export const startHttpApi = () => {
    const { API_PORT } = environmentService.get();
    app.listen(3000, () => {
        console.log('API up & running on port: ', API_PORT);
    });
};
