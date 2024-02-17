import config from './common.config.js';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('successfully connected to the server');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
