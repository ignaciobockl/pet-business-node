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
      expect(user.role).toBeTruthy();
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeDefined();

      if (user.oldPassword) {
        expect(user.oldPassword).toBeTruthy();
      } else expect(user.oldPassword).toBeDefined();
    });

    // Verify specific roles for the mock users
    expect(mockUsers[0].role).toBe(PrismaUserRole.USER);
    expect(mockUsers[1].role).toBe(PrismaUserRole.EMPLOYEE);

    // Additional checks for roles to ensure diversity
    const roles = mockUsers.map((user) => user.role);
    expect(roles).toContain(PrismaUserRole.USER);
    expect(roles).toContain(PrismaUserRole.EMPLOYEE);
  });
});

describe('generateMockCreateUser', () => {
  it('should generate a mock user with expected properties', async () => {
    const mockUser: User = await generateMockCreateUser();

    expect(mockUser.id).toBeTruthy();
    expect(mockUser.userName).toBeTruthy();
    expect(mockUser.password).toBeTruthy();
    expect(mockUser.role).toBeTruthy();
    expect(mockUser.mail).toBeTruthy();
    expect(mockUser.createdAt).toBeTruthy();

    // Verify that userName length is between 6 and 16 characters
    expect(mockUser.userName.length).toBeGreaterThanOrEqual(6);
    expect(mockUser.userName.length).toBeLessThanOrEqual(16);

    // Verify that password meets the passwordRegex criteria (this should be done in utility function but can be added here for extra assurance)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    expect(passwordRegex.test(mockUser.password)).toBe(true);

    // Verify the role is one of the allowed values
    expect([PrismaUserRole.USER, PrismaUserRole.EMPLOYEE]).toContain(
      mockUser.role
    );
  });
});
