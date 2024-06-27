import { Request, Response } from 'express';

import { getUsers } from '../../controllers/user/userController.ts';
import { User } from '../../models/User/user.ts';
import { generateMockUsers } from '../../services/__mocks__/mockUsers.ts';
import * as userService from '../../services/userService.ts';
import handleResponse from '../../utils/responseHandler.ts';

jest.mock('../../services/userService');
jest.mock('../../utils/responseHandler');

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

  it('should handle validation error with status 400', async () => {
    const err = new Error('Validation error');
    err.name = 'ValidationError';
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Validation error',
      status: 400,
    });
  });

  it('should handle unauthorized error with status 401', async () => {
    const err = new Error('Unauthorized error');
    err.name = 'UnauthorizedError';
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Unauthorized error',
      status: 401,
    });
  });

  it('should handle forbidden error with status 403', async () => {
    const err = new Error('Forbidden error');
    err.name = 'ForbiddenError';
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Forbidden error',
      status: 403,
    });
  });

  it('should handle not found error with status 404', async () => {
    const err = new Error('Not found error');
    err.name = 'NotFoundError';
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Not found error',
      status: 404,
    });
  });

  it('should handle unknown error with status 500', async () => {
    const err = new Error('Unknown error');
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Unknown error',
      status: 500,
    });
  });

  it('should handle service unavailable error with status 503', async () => {
    const err = new Error('Service unavailable error');
    err.name = 'ServiceUnavailableError'; // Set the error name to match the expected name
    (userService.getAllUsers as jest.Mock).mockRejectedValue(err);

    await getUsers(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Service unavailable error',
      status: 503,
    });
  });
});
