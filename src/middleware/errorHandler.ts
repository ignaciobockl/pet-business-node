import { NextFunction, Request, Response } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

import logger from '../utils/logger.ts';

/**
 * A map of error names to their corresponding HTTP status codes.
 * Used to determine the appropriate status code to return based on the error name.
 *
 * @type {Record<string, number>}
 */
const errorStatusMap: Record<string, number> = {
  ValidationError: StatusCodes.BAD_REQUEST,
  UnauthorizedError: StatusCodes.UNAUTHORIZED,
  ForbiddenError: StatusCodes.FORBIDDEN,
  NotFoundError: StatusCodes.NOT_FOUND,
  ServiceUnavailableError: StatusCodes.SERVICE_UNAVAILABLE,
};

/**
 * Error handling middleware for Express applications.
 * Logs the error and sends a JSON response with the appropriate status code and message.
 *
 * @param {Error} err - The error that occurred.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} _next - The next middleware function (not used in this implementation).
 *
 * @returns {void}
 */
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error details
  logger.error(err);

  // Determine the status code based on the error name, defaulting to 500 if unknown
  const statusCode =
    errorStatusMap[err.name] || StatusCodes.INTERNAL_SERVER_ERROR;
  const errorMessage = err.message || getReasonPhrase(statusCode);

  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
