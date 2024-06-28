import { UserRole } from '@prisma/client';

import { User } from '../../../models/User/user.ts';
import { generateMockUsers } from '../mockUsers.ts';

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
