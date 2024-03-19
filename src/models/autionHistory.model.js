import mongoose, { Schema } from 'mongoose';
import Product from './product.model.js';
import User from './user.model.js';

const historyAuctionSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const HistoryAuction = mongoose.model('HistoryAuction', historyAuctionSchema);

export default HistoryAuction;
