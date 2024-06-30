import { Request, Response } from 'express';

import { getStatusCode } from '../../middleware/errorHandler.ts';
import * as userService from '../../services/userService.ts';
import createValidationError from '../../utils/errors.ts';
import logger from '../../utils/logger.ts';
import handleResponse from '../../utils/responseHandler.ts';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  try {
    const users = await userService.getAllUsers();
    handleResponse(res, {
      data: users,
      message: 'Users retrieved successfully',
      status: 200,
    });
  } catch (error) {
    logger.error('Error retrieving users:', error);
    if (error instanceof Error) {
      const statusCode = getStatusCode(error); // Obtiene el código de estado adecuado para el error
      handleResponse(res, {
        data: null,
        message: error.message,
        status: statusCode,
      });
    } else {
      handleResponse(res, {
        data: null,
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
};

// eslint-disable-next-line complexity
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  try {
    const { userName, password, mail, role } = req.body;

    const missingFields = [];
    if (!userName) missingFields.push('userName');
    if (!password) missingFields.push('password');
    if (!mail) missingFields.push('mail');
    if (!role) missingFields.push('role');

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
      throw createValidationError(errorMessage, undefined, missingFields);
    }

    const newUser = await userService.createUser({
      userName,
      password,
      mail,
      role,
    });

    handleResponse(res, {
      data: newUser,
      message: 'User created successfully',
      status: 201,
    });
    logger.info(`User ${userName} successfully created`);
  } catch (error) {
    logger.error('Error creating user:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
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
    } else {
      handleResponse(res, {
        data: null,
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
};
