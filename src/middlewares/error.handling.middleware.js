import { CODE_COMMON_FAILED } from '../common/constants/global.const.js';
import LogService from '../config/log.config.js';

/**
 * Handle `AppError` instance error
 */
const handleAppError = (req, res) => (error) => {
  const { baCode, message } = error;
  LogService.logAppErrorRequest(req)(baCode, message);

  res.status(error.code).json({
    code: baCode,
    result: null,
    message: message,
  });
};

/**
 * Handle non-`AppError` error types
 */
const handleError = (req, res) => (error) => {
  let errorMsg = '';
  if (typeof error === 'string') {
    errorMsg = error;
  } else if (error && typeof error === 'object') {
    let errorStr = error.error.message.toString();
    // Prevent unhelpful error log
    if (!errorStr || errorStr === '[object Object]') {
      errorStr = JSON.stringify(error);
    }
    // Check if error stack trace exists
    if (error.stack) {
      errorStr += `\n  Stack Trace: ${error.stack}`;
    }
    errorMsg = errorStr;
  } else {
    errorMsg = 'Unknown server error';
  }
  LogService.logErrorRequest(req)(errorMsg);

  res.status(500).json({
    origin: error.origin,
    code: CODE_COMMON_FAILED,
    result: null,
    message: errorMsg,
  });
};

export { handleAppError, handleError };
