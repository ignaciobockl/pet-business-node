import { NextFunction, Request, Response } from 'express';

import logger from '../utils/logger.ts';
import ErrorCode from '../enums/errorCodes.ts';

/**
 * Helper function to get the appropriate HTTP status code for an error.
 * @param {Error} err The error for which to get the status code.
 * @returns {number} The HTTP status code.
 */
const getStatusCode = (err: Error): number => {
  switch (err.name) {
    case 'ValidationError':
      return ErrorCode.VALIDATION_ERROR;
    case 'UnauthorizedError':
      return ErrorCode.UNAUTHORIZED_ERROR;
    case 'ForbiddenError':
      return ErrorCode.FORBIDDEN_ERROR;
    case 'NotFoundError':
      return ErrorCode.NOT_FOUND_ERROR;
    case 'ServiceUnavailableError':
      return ErrorCode.SERVICE_UNAVAILABLE_ERROR;
    default:
      return ErrorCode.INTERNAL_SERVER_ERROR;
  }
};

/**
 * Helper function to get the appropriate error message for an error.
 * @param {Error} err The error for which to get the error message.
 * @returns {string} The error message.
 */
const getErrorMessage = (err: Error): string =>
  err.message || 'Internal Server Error';

/**
 * Middleware to handle errors in requests.
 * Logs the error and sends a JSON response with the appropriate status code.
 * @param {Error} err The error that occurred.
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The function to pass control to the next middleware (not used in this implementation).
 * @returns {void}
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  logger.error(err);

  const statusCode = getStatusCode(err);
  const errorMessage = getErrorMessage(err);

  res.status(statusCode).json({ error: errorMessage });

  // Llama a next solo si deseas continuar con el siguiente middleware
  next();
};

export default errorHandler;
