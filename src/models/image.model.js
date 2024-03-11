import mongoose, { Schema } from 'mongoose';

const Image = mongoose.model(
  'Image',
  new mongoose.Schema(
    {
      url: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ),
);

export default Image;
