import { Request, Response } from 'express';
import { getUsers } from '../userController.ts';
import * as userService from '../../../services/userService.ts';
import handleResponse from '../../../utils/responseHandler.ts';
import { User } from '../../../models/User/user.ts';
import { encryptPassword } from '../../../utils/encryption.ts';
import { v4 as uuidv4 } from 'uuid';
import { UserRole } from '@prisma/client';

jest.mock('../../../services/userService');
jest.mock('../../../utils/responseHandler');
jest.mock('../../../utils/logger');

describe('User Controller - getUsers', () => {
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

  it('should return users with status 200', async () => {
    const passwordHash = await encryptPassword('password123');
    const oldPasswordHash = await encryptPassword('oldPassword123');

    const mockUsers: User[] = [
      {
        id: uuidv4(),
        userName: 'John Doe',
        password: passwordHash,
        oldPassword: oldPasswordHash,
        role: UserRole.USER,
        mail: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userName: 'Jane Smith',
        password: passwordHash,
        role: UserRole.EMPLOYEE,
        mail: 'jane@example.com',
        createdAt: new Date(),
      },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

    await getUsers(req as Request, res as Response);

    expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(handleResponse).toHaveBeenCalledWith(res, {
      data: mockUsers,
      message: 'Users retrieved successfully',
      status: 200,
    });
  });
});
