import { Request, Response } from 'express';

import handleUserSpecificErrors from '../../middleware/user/handleUserSpecificErrors.ts';
import validateRequiredFields from '../../middleware/user/validateRequiredFields.ts';
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
} from '../../services/userService.ts';
import logger from '../../utils/logger.ts';
import handleResponse from '../../utils/responseHandler.ts';

const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  try {
    const { userName, password, mail, role } = req.body;

    validateRequiredFields(req.body);

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

const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsersService();

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
const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  const { id } = req.params;

  try {
    const user = await getUserByIdService(id);

    if (!user) {
      handleResponse(res, {
        data: null,
        message: 'User not found',
        status: 404,
      });
      return;
    }

    handleResponse(res, {
      data: user,
      message: 'User retrieved successfully',
      status: 200,
    });
    logger.info(`User with id ${id} retrieved successfully`);
  } catch (error) {
    logger.error('Error retrieving user:', error);
    if (error instanceof Error) {
      if (
        error.name === 'InvalidUserIDError' ||
        error.name === 'UserNotFoundError'
      ) {
        handleResponse(res, {
          data: null,
          message: error.message,
          status: 400,
        });
      }

      if (error.message.includes('Error retrieving user')) {
        handleResponse(res, {
          data: null,
          message: error.message,
          status: 404,
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

export { createUserController, getAllUsersController, getUserByIdController };
