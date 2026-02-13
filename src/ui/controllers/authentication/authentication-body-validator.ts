import * as zod from 'zod';

export const authenticationBodyValidator = zod.object({
    email: zod.email(),
    password: zod.string(),
});
