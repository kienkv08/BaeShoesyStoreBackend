import mongoose, { Schema } from 'mongoose';
import Product from './product.model.js';

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
