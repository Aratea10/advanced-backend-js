import mongoose from 'mongoose';
import * as z from 'zod';

export const productIdValidator = z.object({
    productId: z.string().refine(val => mongoose.Types.ObjectId.isValid(val)),
});
