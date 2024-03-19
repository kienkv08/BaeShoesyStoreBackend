import mongoose, { Schema } from 'mongoose';
import Image from './image.model.js';

const Post = mongoose.model(
    'Post',
    new mongoose.Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
            },
            images: [
                {
                    _id: {
                        type: Schema.Types.ObjectId,
                        ref: 'Image',
                    },
                    url: {
                        type: String,
                    },
                },
            ],
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
        {
            timestamps: true,
        },
    ),
);

export default Post;
