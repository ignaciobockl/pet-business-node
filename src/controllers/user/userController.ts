import { Request, Response } from 'express';

import * as userService from '../../services/userService.ts';
import handleResponse from '../../utils/responseHandler.ts';

// ! temporalmente se utiliza este disable
// eslint-disable-next-line import/prefer-default-export
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    handleResponse(res, {
      data: users,
      message: 'Users retrieved successfully',
      status: 200,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Unable to retrieve users'
    ) {
      handleResponse(res, { message: error.message, status: 400 });
    } else {
      handleResponse(res, { message: 'Internal Server Error', status: 500 });
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
