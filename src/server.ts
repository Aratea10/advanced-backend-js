import mongoose from 'mongoose';
import { startHttpApi } from './ui/api';
import { environmentService } from './infrastructure/services/environment-service';

const loadEnvironment = () => {
    console.log('loading environment...');
    environmentService.load();
    console.log('environment loaded =)');
};

const connectMongoDb = async () => {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST } = environmentService.get();
    console.log('Connecting to mongodb...');
    await mongoose.connect(
        `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/db?authSource=admin`
    );
    console.log('mongodb connected =)');
};

const executeApp = async () => {
    try {
        loadEnvironment();
        await connectMongoDb();
        startHttpApi();
    } catch (error) {
        console.log('unable to start application: ', error);
        process.exit(1);
    }
};

void executeApp();
