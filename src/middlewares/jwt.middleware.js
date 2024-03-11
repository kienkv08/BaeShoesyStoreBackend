import { HTTP_CODE } from '../common/constants/global.const.js';
import config from '../config/common.config.js';
import { AppError, ManagedError } from '../models/error.model.js';
import jwt from 'jsonwebtoken';
import { handleAppError } from './error.handling.middleware.js';
const checkTokenExpired = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    const token = authHeader.split(/\s/)[1];
    if (!token) {
      throw new AppError('Token is required', HTTP_CODE.NotFound);
    }
    jwt.verify(token, config.ACCESS_TOKEN, (err, user) => {
      if (err && err.message === 'jwt expired') {
        next();
      }
    });
    next();
  } catch (error) {
    throw new ManagedError('jwt', error);
  }
};

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(/\s+/)[1];
    jwt.verify(token, config.ACCESS_TOKEN || '', (err, user) => {
      if (err) {
        return handleUnauthorized(req, res);
      }
      req.body.user = user;

      next();
    });
  } else {
    return handleUnauthorized(req, res);
  }
};

function handleUnauthorized(req, res) {
  return handleAppError(req, res)(new AppError('Unauthorized request', 401));
}

export { checkTokenExpired, authenticateJwt };
