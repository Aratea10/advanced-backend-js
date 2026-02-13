import express from 'express';
import productRouter from './product.routes';

export const app = express();
app.use(express.json());

app.use('/products', productRouter);

export const startHttpApi = () => {
    app.listen(3000, () => {
        console.log('API up & running on port: ', 3000);
    });
};
