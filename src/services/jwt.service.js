import config from '../config/common.config.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../models/error.model.js';

export const generalAccessToken = async (payload) => {
  const accessToken = jwt.sign(
    {
      ...payload,
    },
    config.ACCESS_TOKEN,
    { expiresIn: '1d' },
  );
  return accessToken;
};

export const generalRefreshToken = async (payload) => {
  const refreshToken = jwt.sign(
    {
      ...payload,
    },
    config.REFRESH_TOKEN,
    { expiresIn: '365d' },
  );
  return refreshToken;
};

export const refreshTokenServices = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, config.REFRESH_TOKEN, async (err, user) => {
        if (err) {
          reject(new AppError('the-authentication-token'));
        }
        const accessToken = await generalAccessToken({
          id: user?.id,
          username: user?.username,
          role: user?.role,
          image: user?.image,
          cart: user?.cart,
        });
        resolve(accessToken);
      });
    } catch (err) {
      reject(err);
    }
  });
};
