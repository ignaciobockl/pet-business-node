import { Response } from 'express';

import handleResponse from '../../utils/responseHandler.ts';
import { getStatusCode } from '../errorHandler.ts';

const handleUserSpecificErrors = (error: Error, res: Response): void => {
  if (error.name === 'ValidationError') {
    handleResponse(res, {
      data: null,
      message: error.message,
      status: 400,
    });
  } else if (error.message.includes('User with email')) {
    handleResponse(res, {
      data: null,
      message: error.message,
      status: 400,
    });
  } else if (
    error.message.includes('Cannot create a user with the administrator role')
  ) {
    handleResponse(res, {
      data: null,
      message: error.message,
      status: 400,
    });
  } else {
    const statusCode = getStatusCode(error);
    handleResponse(res, {
      data: null,
      message: error.message,
      status: statusCode,
    });
  }
};

export default handleUserSpecificErrors;
