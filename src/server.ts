import mongoose from 'mongoose';
import { startHttpApi } from './ui/api';
import { environmentService } from './infrastructure/services/environment-service';
import * as Sentry from '@sentry/node';
import cron from 'node-cron';
import { SendProductReportUseCase } from './domain/use-cases/product/send-product-report-usecase';
import { UserMongoRepository } from './infrastructure/repositories/user-mongo-repository';
import { ProductMongodbRepository } from './infrastructure/repositories/product-mongo-repository';
import { MailtrapService } from './infrastructure/services/email-service';

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

const startCronJobs = () => {
    const WeeklyReportEmailJob_weekly_monday_at_10 = '0 10 * * 1';

    cron.schedule(WeeklyReportEmailJob_weekly_monday_at_10, () => {
        const userRepository = new UserMongoRepository();
        const productRepository = new ProductMongodbRepository();
        const emailService = new MailtrapService();
        const sendProductReportUsecase = new SendProductReportUseCase(
            userRepository,
            productRepository,
            emailService
        );
        void sendProductReportUsecase.execute();
    });
};

const executeApp = async () => {
    try {
        loadEnvironment();
        initializeSentry();
        await connectMongoDb();
        startHttpApi();
        startCronJobs();
    } catch (error) {
        console.log('unable to start application: ', error);
        process.exit(1);
    }
};

void executeApp();
