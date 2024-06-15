import { User, UserResponse } from '../../models/User/user.ts';
import prisma from '../../prisma.ts';
import logger from '../../utils/logger.ts';
import generateMockUsers from '../__mocks__/mockUsers.ts';
import { getAllUsers } from '../userService.ts';

jest.mock('../../prisma.ts', () => ({
  user: {
    findMany: jest.fn(),
  },
}));
jest.mock('../../utils/logger.ts');

describe('getAllUsers', () => {
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
});
