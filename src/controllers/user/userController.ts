import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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
      status: StatusCodes.CREATED,
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
        status: StatusCodes.INTERNAL_SERVER_ERROR,
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
      status: StatusCodes.OK,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      // TODO: deberia ser 400
      handleResponse(res, {
        data: null,
        message: error.message || 'Unable to retrieve users',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    } else {
      handleResponse(res, {
        data: null,
        message: 'Internal Server Error',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
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
        status: StatusCodes.NOT_FOUND,
      });
      return;
    }

    handleResponse(res, {
      data: user,
      message: 'User retrieved successfully',
      status: StatusCodes.OK,
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
          status: StatusCodes.BAD_REQUEST,
        });
      } else if (error.message === 'Internal Server Error') {
        handleResponse(res, {
          data: null,
          message: 'Internal Server Error',
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      } else {
        handleResponse(res, {
          data: null,
          message: 'Error retrieving user',
          status: StatusCodes.NOT_FOUND,
        });
      }
    } else {
      handleResponse(res, {
        data: null,
        message: 'Internal Server Error',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      });
    }
  }
};

export { createUserController, getAllUsersController, getUserByIdController };
