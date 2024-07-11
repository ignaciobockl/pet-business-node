import { Request, Response } from 'express';

import handleUserSpecificErrors from '../../middleware/user/handleUserSpecificErrors.ts';
import {
  createUserService,
  getAllUsersService,
} from '../../services/userService.ts';
import createValidationError from '../../utils/errors.ts';
import logger from '../../utils/logger.ts';
import handleResponse from '../../utils/responseHandler.ts';

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsersService();

    // Validar los datos obtenidos
    users.forEach((user) => {
      if (!user.id || typeof user.id !== 'string') {
        const errorMessage = `Validation error for user with ID ${user.id}`;
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    });

    handleResponse(res, {
      data: users,
      message: 'Users retrieved successfully',
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      handleResponse(res, {
        data: null,
        message: error.message || 'Unable to retrieve users',
        status: 500,
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
export const createUserController = async (
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

    const newUser = await createUserService({
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
      handleUserSpecificErrors(error, res);
    } else {
      handleResponse(res, {
        data: null,
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
};
