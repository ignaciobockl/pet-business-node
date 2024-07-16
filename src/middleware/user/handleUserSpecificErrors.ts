import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const handleUserSpecificErrors = (error: Error, res: Response): void => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errorMessage = error.message;

  if (
    error.name === 'ValidationError' ||
    error.message.includes('User with email') ||
    error.message.includes('Cannot create a user with the administrator role')
  ) {
    statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(statusCode).json({ message: errorMessage });
};

export default handleUserSpecificErrors;
