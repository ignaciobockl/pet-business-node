import { UserRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../models/User/user.ts';
import { encryptPassword } from '../../utils/encryption.ts';

const generateMockUsers = async (): Promise<User[]> => {
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
      updatedAt: null,
    },
  ];

  return mockUsers;
};

export default generateMockUsers;
