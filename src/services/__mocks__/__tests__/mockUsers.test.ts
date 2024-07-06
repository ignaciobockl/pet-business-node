import { UserRole as PrismaUserRole } from '@prisma/client';

import { User } from '../../../models/User/user.ts';
import { generateMockCreateUser, generateMockUsers } from '../mockUsers.ts';

describe('generateMockUsers', () => {
  it('should generate mock users with expected properties', async () => {
    // await prisma.user.deleteMany();

    const mockUsers: User[] = await generateMockUsers();

    expect(mockUsers).toHaveLength(3);

    mockUsers.forEach((user) => {
      expect(user.id).toBeTruthy();
      expect(user.userName).toBeTruthy();
      expect(user.password).toBeTruthy();
      expect(user.mail).toBeTruthy();
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeDefined();

      if (user.oldPassword) {
        expect(user.oldPassword).toBeTruthy();
      } else expect(user.oldPassword).toBeDefined();
    });

    expect(mockUsers[0].role).toBe(PrismaUserRole.USER);
    expect(mockUsers[1].role).toBe(PrismaUserRole.EMPLOYEE);
  });
});

describe('generateMockCreateUser', () => {
  it('should generate a mock user with expected properties', async () => {
    const mockUser: User[] = await generateMockCreateUser();

    expect(mockUser).toHaveLength(1);

    const user = mockUser[0];
    expect(user.id).toBeTruthy();
    expect(user.userName).toBeTruthy();
    expect(user.password).toBeTruthy();
    expect(user.mail).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
    expect(user.role).toBeTruthy();
  });
});
