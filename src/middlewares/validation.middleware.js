import { AppError } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import { handleAppError } from './error.handling.middleware';

const validate = (validations) => async (req, res, next) => {
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return handleAppError(req, res)(new AppError(errors.array()[0].msg, 403));
};

export default validate;
