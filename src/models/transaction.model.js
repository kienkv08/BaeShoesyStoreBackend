import mongoose, { Schema } from 'mongoose';
import Product from './product.model.js';
import Order from './order.model.js';
import User from './user.model.js';

const Transaction = mongoose.model(
  'Transaction',
  new mongoose.Schema(
    {
      totalAmount: {
        type: Number,
        required: true,
      },
      deleteAt: {
        type: Date,
        default: null,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
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

export default Transaction;
