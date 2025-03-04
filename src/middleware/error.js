import httpStatus from 'http-status';
import { env } from '../config/config.js';
import logger from '../config/logger.js';


export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (env === 'production' && !err.isOperational) {
    statusCode = INTERNAL_SERVER_ERROR;
    message = httpStatus[INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(env === 'development' && { stack: err.stack }),
  };

  if (env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
