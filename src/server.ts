import mongoose from 'mongoose';
import { startHttpApi } from './ui/api';
import { environmentService } from './infrastructure/services/environment-service';
import * as Sentry from '@sentry/node';

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

const initializeSentry = () => {
    const { SENTRY_DSN, ENVIRONMENT } = environmentService.get();

    Sentry.init({
        dsn: SENTRY_DSN,
        environment: ENVIRONMENT,
    });
};

const executeApp = async () => {
    try {
        loadEnvironment();
        initializeSentry();
        await connectMongoDb();
        startHttpApi();
    } catch (error) {
        console.log('unable to start application: ', error);
        process.exit(1);
    }
};

void executeApp();
