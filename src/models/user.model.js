import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Product from './product.model.js';
import config from '../config/common.config.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      default: config.DEFAULT_AVARTAR,
    },
    role: {
      type: Number,
      required: false,
      default: 2,
    },
    address: {
      type: String,
      required: false,
    },
    gender: {
      type: Boolean,
      required: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if ('password' in update && typeof update === 'object') {
    const password = update.password;
    if (password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      update.password = hash;
    }
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema);

export default User;
