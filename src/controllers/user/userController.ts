import { Request, Response } from 'express';

import { getStatusCode } from '../../middleware/errorHandler.ts';
import * as userService from '../../services/userService.ts';
import logger from '../../utils/logger.ts';
import handleResponse from '../../utils/responseHandler.ts';

// ! temporalmente se utiliza este disable
// eslint-disable-next-line import/prefer-default-export
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

// export const createUser = async (
//   req: Request<{}, {}, CreateUserDto>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const user = await userService.createUser(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     if (
//       error instanceof Error &&
//       error.message === 'Cannot create a user with the administrator role'
//     )
//       res.status(400).json({ error: error.message });
//     else {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// };
