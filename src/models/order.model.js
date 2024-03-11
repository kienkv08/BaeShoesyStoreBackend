import mongoose, { Schema } from 'mongoose';
import Post from './post.model.js';

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
      post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
      status: {
        type: Boolean,
        default: 1,
      },
      paymentType: {
        type: String,
        default: 1,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Order;
