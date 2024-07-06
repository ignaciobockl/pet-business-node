import { Request, Response } from 'express';

import { getAllUsersController } from '../../controllers/user/userController.ts';
import { User } from '../../models/User/user.ts';
import { generateMockUsers } from '../../services/__mocks__/mockUsers.ts';

import handleResponse from '../../utils/responseHandler.ts';
import { getAllUsersService } from '../../services/userService.ts';

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
    (getAllUsersService as jest.Mock).mockResolvedValue(mockUsers);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(getAllUsersService).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: mockUsers,
      message: 'Users retrieved successfully',
      status: 200,
    });
  });

  it('should handle validation error with status 400', async () => {
    const err = new Error('Validation error');
    err.name = 'ValidationError';
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Validation error',
      status: 400,
    });
  });

  it('should handle unauthorized error with status 401', async () => {
    const err = new Error('Unauthorized error');
    err.name = 'UnauthorizedError';
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Unauthorized error',
      status: 401,
    });
  });

  it('should handle forbidden error with status 403', async () => {
    const err = new Error('Forbidden error');
    err.name = 'ForbiddenError';
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Forbidden error',
      status: 403,
    });
  });

  it('should handle not found error with status 404', async () => {
    const err = new Error('Not found error');
    err.name = 'NotFoundError';
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Not found error',
      status: 404,
    });
  });

  it('should handle unknown error with status 500', async () => {
    const err = new Error('Unknown error');
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Unknown error',
      status: 500,
    });
  });

  it('should handle service unavailable error with status 503', async () => {
    const err = new Error('Service unavailable error');
    err.name = 'ServiceUnavailableError'; // Set the error name to match the expected name
    (getAllUsersService as jest.Mock).mockRejectedValue(err);

    await getAllUsersController(req as Request, mockRes as Response);

    expect(handleResponse).toHaveBeenCalledWith(mockRes, {
      data: null,
      message: 'Service unavailable error',
      status: 503,
    });
  });
});
