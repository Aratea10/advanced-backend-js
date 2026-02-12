import express from 'express'
import mongoose from 'mongoose'
import productRouter from './product.routes.js';

const connectMongoDb = async () => {
    await mongoose.connect('mongodb://admin:admin123@localhost:27017/db?authSource=admin');
    console.log('mongodb connected =)');
}

const startHttpApi = () => {
    const app = express();
    app.use(express.json())

    app.use('/products', productRouter);

    app.listen(3000, () => {
        console.log("API up & running on port: ", 3000);
    })
}

const executeApp = async () => {

    try {
        await connectMongoDb();
        startHttpApi();
    } catch (error) {
        console.log('unable to start application: ', error);
        process.exit(1);
    }
}

executeApp();
