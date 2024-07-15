import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import logger from '../utils/logger.ts';

/**
 * Helper function to get the appropriate HTTP status code for an error.
 * @param {Error} err The error for which to get the status code.
 * @returns {number} The HTTP status code.
 */
// eslint-disable-next-line complexity
export const getStatusCode = (err: Error): number => {
  switch (err.name) {
    case 'ValidationError':
      return StatusCodes.BAD_REQUEST;
    case 'UnauthorizedError':
      return StatusCodes.UNAUTHORIZED;
    case 'ForbiddenError':
      return StatusCodes.FORBIDDEN;
    case 'NotFoundError':
      return StatusCodes.NOT_FOUND;
    case 'ServiceUnavailableError':
      return StatusCodes.SERVICE_UNAVAILABLE;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
};

/**
 * Helper function to get the appropriate error message for an error.
 * @param {Error} err The error for which to get the error message.
 * @returns {string} The error message.
 */
const getErrorMessage = (err: Error): string =>
  err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

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
