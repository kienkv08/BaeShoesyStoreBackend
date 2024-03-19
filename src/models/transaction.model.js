import mongoose, { Schema } from 'mongoose';
import Post from './post.model.js';
import Order from './order.model.js';

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
      post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
      order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
      createdAt: {
        type: Number,
        default: Date.now,
      },
      updatedAt: {
        type: Number,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Transaction;
