import mongoose, { Schema } from 'mongoose';

const Category = mongoose.model(
  'Category',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      deleteAt: {
        type: Date,
        default: null,
      },
      image: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Category;
