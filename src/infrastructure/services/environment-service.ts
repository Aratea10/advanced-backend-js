import dotenv from 'dotenv';
import * as z from 'zod';

const environmentVariablesValidator = z.object({
    ENVIRONMENT: z.enum(['local', 'staging', 'production']),
    API_PORT: z.string(),
    MONGO_USER: z.string(),
    MONGO_PASSWORD: z.string(),
    MONGO_HOST: z.string(),
    JWT_SECRET: z.string(),
});

type EnvironmentVariables = z.infer<typeof environmentVariablesValidator>;

class EnvironmentService {
    private environmentVariables: EnvironmentVariables | null = null;
    load() {
        if (this.environmentVariables) {
            return;
        }
        const currentEnvironment = process.env.NODE_ENV ?? '';
        const environmentFile = this.getEnvironmentFile(currentEnvironment);

        const variables: dotenv.DotenvConfigOutput = dotenv.config({ path: environmentFile });

        if (variables.error) {
            throw new Error(`Error reading environment variables: ${variables.error.message}`);
        }

        try {
            this.environmentVariables = environmentVariablesValidator.parse(variables.parsed);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? `Error validating environment variables: ${error.message}` : '';
            throw new Error(`Error validating environment variables: ${errorMessage}`);
        }
    }

    get() {
        if (!this.environmentVariables) {
            throw new Error('Environment variables are not loaded. Use load method first');
        }

        return this.environmentVariables;
    }

    private getEnvironmentFile(currentEnvironment: string) {
        switch (currentEnvironment) {
            case 'production':
                return '.env.production';
                break;
            case 'staging':
                return '.env.staging';
                break;

            default:
                return '.env';
                break;
        }
    }
}

export const environmentService = new EnvironmentService();
