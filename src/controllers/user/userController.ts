import { Request, Response } from 'express';

import { getStatusCode } from '../../middleware/errorHandler.ts';
import * as userService from '../../services/userService.ts';
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

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  try {
    const { userName, password, mail, role } = req.body;
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
    logger.info(`Usuario ${userName} creado correctamente`);
  } catch (error) {
    logger.error('Error creating user:', error);
    if (error instanceof Error) {
      const statusCode = getStatusCode(error);
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
