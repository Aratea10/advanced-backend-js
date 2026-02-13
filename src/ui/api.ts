import express from 'express';
import productRouter from './routes/product-routes';
import authenticationRouter from './routes/authentication-routes';

export const app = express();
app.use(express.json());

app.use('/products', productRouter);
app.use('/authentication', authenticationRouter);

export const startHttpApi = () => {
    app.listen(3000, () => {
        console.log('API up & running on port: ', 3000);
    });
};
