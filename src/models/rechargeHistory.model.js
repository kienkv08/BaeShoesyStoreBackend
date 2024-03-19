import mongoose, { Schema } from 'mongoose';

const RechargeHistory = mongoose.model(
  'RechargeHistory',
  new mongoose.Schema(
    {
      amount: {
        type: Number,
        required: true,
        default: 0,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      orderId: {
        type: String,
        unique: true,
      },
      status: {
        type: String,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default RechargeHistory;
