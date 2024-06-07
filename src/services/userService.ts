import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma.ts';
import { UserRole } from '@prisma/client';
import { User } from '../models/User/user.ts';
import { CreateUserDto } from '../models/types/user.js';
import log from '../utils/logger.ts';
import { encryptPassword } from '../utils/encryption.ts';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    log('error', 'Error retrieving users', { error });
    throw new Error('Unable to retrieve users');
  }
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const encryptedPassword = await encryptPassword(userData.password);
  const uuid = uuidv4();

  if (userData.role === UserRole.ADMIN)
    throw new Error('Cannot create a user with the administrator role');

  // TODO: verificar que el email no se encuentre registrado

  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
        id: uuid,
        password: encryptedPassword,
        oldPassword: null,
      },
    });
    return user;
  } catch (error) {
    log('error', 'Error creating user', { error });
    throw error;
  }
};

// TODO: login
// export const loginUser = async (userName: string, password: string): Promise<User | null> => {
//   const user = await prisma.user.findUnique({
//     where: {
//       userName,
//     },
//   });

//   if (!user) {
//     return null;
//   }

//   const passwordMatch = await comparePassword(password, user.password);

//   if (!passwordMatch) {
//     return null;
//   }

//   return user;
// };
