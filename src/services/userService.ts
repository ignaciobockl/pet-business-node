import prisma from '../prisma.ts';
import { User } from '../models/User/user.ts';
import { CreateUserDto } from '../models/types/user.js';
import log from '../utils/logger.ts';
import { encryptPassword } from '../utils/encryption.ts';
import { UserRole as PrismaUserRole } from '@prisma/client';

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

  if (userData.role === PrismaUserRole.ADMIN)
    throw new Error('Cannot create a user with the administrator role');

  // TODO: verificar que el email no se encuentre registrado

  try {
    const user = await prisma.user.create({
      data: {
        ...userData,
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
