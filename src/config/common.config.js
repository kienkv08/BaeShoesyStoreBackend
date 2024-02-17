import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  APP_PORT: Number(process.env.APP_PORT),
  APP_HOST: String(process.env.APP_HOST),
  LIMIT_REQUEST_BODY: process.env.LIMIT_REQUEST_BODY,
  CLIENT_URL: process.env.CLIENT_URL,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  MONGO_CONNECT: process.env.MONGO_CONNECT,
};
export default config;
