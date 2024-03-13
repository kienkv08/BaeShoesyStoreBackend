import mongoose, { Schema } from 'mongoose';
import Product from './product.model.js';
import User from './user.model.js';

const HistoryAuction = mongoose.model(
  'HistoryAuction',
  new mongoose.Schema(
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    },
    {
      price: {
        type: Number,
        require: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default HistoryAuction;
