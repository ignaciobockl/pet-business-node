import { Request, Response } from 'express';

import { generateMockUsers } from '../../../../services/__mocks__/mockUsers.ts';
import { getAllUsersService } from '../../../../services/userService.ts';
import handleResponse from '../../../../utils/responseHandler.ts';
import { getAllUsersController } from '../../userController.ts';

jest.mock('../../../../services/userService');
jest.mock('../../../../utils/responseHandler');

describe('getAllUsersController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('should return all users successfully', async () => {
    const mockUsers = generateMockUsers();

    (getAllUsersService as jest.Mock).mockResolvedValue(mockUsers);

    await getAllUsersController(req as Request, res as Response);

    expect(getAllUsersService).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(res, {
      data: await Promise.resolve(mockUsers),
      message: 'Users retrieved successfully',
      status: 200,
    });
  });

  it('should handle errors from getAllUsersService', async () => {
    const errorMessage = 'Error retrieving users';

    (getAllUsersService as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await getAllUsersController(req as Request, res as Response);

    expect(getAllUsersService).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(res, {
      data: null,
      message: errorMessage,
      status: 500,
    });
  });

  it('should handle validation errors from getAllUsersService', async () => {
    const validationErrorMessage = 'Validation error for user with ID 1';

    (getAllUsersService as jest.Mock).mockRejectedValue(
      new Error(validationErrorMessage)
    );

    await getAllUsersController(req as Request, res as Response);

    expect(getAllUsersService).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(res, {
      data: null,
      message: validationErrorMessage,
      status: 500,
    });
  });
});
