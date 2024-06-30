import { User, UserResponse } from '../../../models/User/user.ts';
import prisma from '../../../prisma.ts';
import logger from '../../../utils/logger.ts';
import { generateMockUsers } from '../../__mocks__/mockUsers.ts';
import { getAllUsers } from '../../userService.ts';

jest.mock('../../../prisma.ts', () => ({
  user: {
    findMany: jest.fn(),
  },
}));
jest.mock('../../../utils/logger.ts');

describe('getAllUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers: User[] = await generateMockUsers();

    (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

    const result = await getAllUsers();

    expect(result.length).toEqual(mockUsers.length);

    result.forEach((user: UserResponse, index: number) => {
      const mockUser: User = mockUsers[index];
      expect(user.id).toEqual(mockUser.id);
      expect(user.userName).toEqual(mockUser.userName);
      expect(user.role).toEqual(mockUser.role);
      expect(user.mail).toEqual(mockUser.mail);
      expect(user.createdAt.toISOString()).toEqual(
        mockUser.createdAt.toISOString()
      );
      expect(user.updatedAt?.toISOString() ?? undefined).toEqual(
        mockUser.updatedAt?.toISOString() ?? undefined
      );
    });

    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Users retrieved successfully');
  });

  it('should throw an error if users cannot be retrieved', async () => {
    const errorMessage = 'Unable to retrieve users';

    (prisma.user.findMany as jest.Mock).mockRejectedValue(
      new Error(errorMessage)
    );

    await expect(getAllUsers()).rejects.toThrow(errorMessage);

    expect(logger.error).toHaveBeenCalled();
  });

  it('should return an empty array if no users are found', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

    const result = await getAllUsers();

    expect(result).toEqual([]);
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledWith('Users retrieved successfully');
  });

  it('should handle incorrect data format gracefully', async () => {
    const malformedUsers = [{ id: 1, name: 'John Doe' }];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(malformedUsers);

    await expect(getAllUsers()).rejects.toThrow(
      'Validation error for user with ID 1'
    );

    expect(logger.error).toHaveBeenCalledWith(
      'Validation error for user:',
      expect.objectContaining({
        user: malformedUsers[0],
        validationError: expect.any(Error),
      })
    );
  });

  it('should throw a validation error if user data is invalid', async () => {
    const invalidUser = {
      id: 'invalid-id',
      userName: 'John Doe',
      mail: 'not-an-email',
      role: 'USER',
      createdAt: new Date('2024-06-24T21:07:05.417Z'),
      updatedAt: new Date('2024-06-24T21:07:06.417Z'),
    };

    (prisma.user.findMany as jest.Mock).mockResolvedValue([invalidUser]);

    await expect(getAllUsers()).rejects.toThrow(
      `Validation error for user with ID ${invalidUser.id}`
    );

    expect(logger.error).toHaveBeenCalledWith(
      'Validation error for user:',
      expect.any(Object)
    );
  });
});
