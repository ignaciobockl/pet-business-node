import { User, UserResponse } from '../../../models/User/user.ts';
import prisma from '../../../prisma.ts';
import { generateMockCreateUser } from '../../__mocks__/mockUsers.ts';
import { createUserService, getUserByIdService } from '../../userService.ts';

jest.mock('../../../utils/logger.ts');

describe('getUserByIdService', () => {
  let createUser: User;
  let newUser: UserResponse;

  beforeAll(async () => {
    createUser = await generateMockCreateUser();
    console.log('🎆 ~ beforeAll ~ createUser:', createUser);

    // Clean the database before starting tests
    await prisma.user.deleteMany();

    newUser = await createUserService(createUser);
    console.log('🥤 ~ beforeAll ~ newUser:', newUser);
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
});
