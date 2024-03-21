import mongoose, { Schema } from 'mongoose';
import Product from './product.model.js';
import User from './user.model.js';

const Order = mongoose.model(
  'Order',
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      status: {
        type: Number,
        default: 1,
      },
      paymentType: {
        type: String,
        default: 1,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Order;
