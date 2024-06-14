import { Request, Response } from 'express';

import { User } from '../../../models/User/user.ts';
import generateMockUsers from '../../../services/__mocks__/mockUsers.ts';
import * as userService from '../../../services/userService.ts';
import handleResponse from '../../../utils/responseHandler.ts';
import { getUsers } from '../userController.ts';

jest.mock('../../../services/userService');
jest.mock('../../../utils/responseHandler');

describe('User Controller - getUsers', () => {
  let req: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockUsers: User[];

  beforeEach(async () => {
    mockUsers = await generateMockUsers();

    req = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();

    (handleResponse as jest.Mock).mockImplementationOnce((res, data) => {
      res.status(data.status).json(data);
    });
  });

  it('should return users with status 200', async () => {
    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    await getUsers(req as Request, mockRes as Response);

    expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: mockUsers,
      message: 'Users retrieved successfully',
      status: 200,
    });
  });
});
