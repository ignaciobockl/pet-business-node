import type { User } from '@/models/User/user.ts';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../prisma.ts';
import type { CreateUserDto } from '@/models/types/user.d.ts';
import { encryptPassword } from '@/utils/encryption.ts';
import { UserRole } from '@prisma/client';
import log from '@/utils/logger.ts';

export const getAllUsers = async (): Promise<User[]> => prisma.user.findMany();

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const encryptedPassword = await encryptPassword(userData.password);
  const uuid = uuidv4();

  if (userData.role === UserRole.ADMIN)
    throw new Error('No se puede crear un usuario con el rol de administrador');

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
