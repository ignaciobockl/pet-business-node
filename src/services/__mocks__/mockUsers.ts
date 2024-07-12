import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../models/User/user.ts';
import { encryptPassword } from '../../utils/encryption.ts';

const password = 'passworD123!';
const oldPassword = 'oldP!assword123';
const shufflePass = (word: string): string =>
  word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

const currentDateISO = new Date(dayjs().toISOString());

export const generateMockUsers = async (): Promise<User[]> => {
  const passwordHash = await encryptPassword(password);
  const oldPasswordHash = await encryptPassword(oldPassword);

  const mockUsers: User[] = [
    {
      id: uuidv4(),
      userName: 'John Doe',
      password: passwordHash,
      oldPassword: [oldPasswordHash],
      role: UserRole.USER,
      mail: 'john@example.com',
      createdAt: currentDateISO,
      // TODO: debe ser un array de string
      updatedAt: new Date(),
    },
    {
      id: uuidv4(),
      userName: 'Jane Smith',
      password: passwordHash,
      oldPassword: [],
      role: UserRole.EMPLOYEE,
      mail: 'jane@example.com',
      createdAt: currentDateISO,
      updatedAt: null,
    },
    {
      id: uuidv4(),
      userName: 'Lalo landa',
      password: passwordHash,
      oldPassword: [],
      role: UserRole.USER,
      mail: 'lalo@example.com',
      createdAt: currentDateISO,
      updatedAt: null,
    },
  ];

  return mockUsers;
};

export const generateMockCreateUser = async (): Promise<User> => {
  const mockUsers: User = {
    id: uuidv4(),
    userName: faker.internet.userName().substring(0, 16).padEnd(6, 'a'),
    password: shufflePass(password),
    role: faker.helpers.arrayElement([UserRole.USER, UserRole.EMPLOYEE]),
    mail: faker.internet.email().toLowerCase(),
    createdAt: currentDateISO,
    updatedAt: null,
  };
  return mockUsers;
};
