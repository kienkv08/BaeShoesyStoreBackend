import mongoose, { Schema } from 'mongoose';
import Transaction from './transaction.model.js';

const Profit = mongoose.model(
  'Profit',
  new mongoose.Schema(
    {
      amout: {
        type: Number,
        required: true,
      },
      deleteAt: {
        type: Date,
        default: null,
      },
      transaction: {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Profit;
