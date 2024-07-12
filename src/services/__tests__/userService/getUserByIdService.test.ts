import { User, UserResponse } from '../../../models/User/user.ts';
import prisma from '../../../prisma.ts';
import { generateMockCreateUser } from '../../__mocks__/mockUsers.ts';
import { createUserService, getUserByIdService } from '../../userService.ts';

jest.mock('../../../utils/logger.ts');

describe('getUserByIdService', () => {
  let createUser: User;
  let findUniqueSpy: jest.SpyInstance;
  let newUser: UserResponse;

  beforeAll(async () => {
    createUser = await generateMockCreateUser();

    // Clean the database before starting tests
    await prisma.user.deleteMany();

    newUser = await createUserService(createUser);
  });

  beforeEach(() => {
    findUniqueSpy = jest.spyOn(prisma.user, 'findUnique');
  });

  afterEach(() => {
    findUniqueSpy.mockRestore();
  });

  //   afterAll(async () => {
  //     // Clean database after testing
  //     await prisma.user.deleteMany();
  //     await prisma.$disconnect();
  //   });

  it('should return user details when user exists', async () => {
    const result = await getUserByIdService(newUser.id);

    expect(result).toEqual(newUser);
  });

  it('should return null for a non-existing user', async () => {
    const result = await getUserByIdService('non-existing-id');

    expect(result).toBeNull();
  });

  it('should throw an error for an invalid ID', async () => {
    await expect(getUserByIdService('')).rejects.toThrow('Invalid user ID');
    expect(findUniqueSpy).not.toHaveBeenCalled();
  });
});
