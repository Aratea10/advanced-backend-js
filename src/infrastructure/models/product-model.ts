import mongoose, { Types } from 'mongoose';

export interface ProductMongoDb {
    name: string;
    description: string;
    ownerId: Types.ObjectId;
    _id: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new mongoose.Schema<ProductMongoDb>(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        ownerId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

export const ProductModel = mongoose.model('Product', ProductSchema, 'Products');
