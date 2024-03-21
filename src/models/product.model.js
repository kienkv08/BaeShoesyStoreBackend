import mongoose, { Schema } from 'mongoose';
import Image from './image.model.js';
import Category from './category.model.js';

const Product = mongoose.model(
  'Product',
  new mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
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
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      subTitle: {
        type: String,
      },
      status: {
        type: Number,
        default: 0,
      },
      address: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        require: true,
      },
      deletedAt: {
        type: Date,
        default: null,
      },
      timeStart: {
        type: Number,
        require: true,
      },
      timeEnd: {
        type: Number,
        require: true,
      },
      maxPrice: {
        type: Number,
        default: 0,
      },
      created_by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Product;
