import { UserRole } from '@prisma/client';

import { User } from '../../../models/User/user.ts';
import { generateMockCreateUser, generateMockUsers } from '../mockUsers.ts';
import prisma from '../../../prisma.ts';

describe('generateMockUsers', () => {
  it('should generate mock users with expected properties', async () => {
    const mockUsers: User[] = await generateMockUsers();

    expect(mockUsers).toHaveLength(2);

    mockUsers.forEach((user) => {
      expect(user.id).toBeTruthy();
      expect(user.userName).toBeTruthy();
      expect(user.password).toBeTruthy();
      expect(user.oldPassword).toBeDefined();
      expect(user.mail).toBeTruthy();
      expect(user.createdAt).toBeTruthy();
      expect(user.updatedAt).toBeDefined();
    });

    expect(mockUsers[0].role).toBe(UserRole.USER);
    expect(mockUsers[1].role).toBe(UserRole.EMPLOYEE);
  });
});

describe('generateMockCreateUser', () => {
  it('should generate a mock user with expected properties', async () => {
    const mockUser: User[] = await generateMockCreateUser();
    console.log('🍔 ~ it ~ mockUser:', mockUser);

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
