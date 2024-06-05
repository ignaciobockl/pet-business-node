import type { User } from '@/models/User/user.ts';
import prisma from '../prisma.ts';
import type { CreateUserDto } from '@/models/types/user.d.ts';
import { encryptPassword } from '@/utils/encryption.ts';

export const getAllUsers = async (): Promise<User[]> => prisma.user.findMany();

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const encryptedPassword = await encryptPassword(userData.password);

  // TODO: no permitir userRole Admin

  const user = await prisma.user.create({
    data: {
      ...userData,
      password: encryptedPassword,
      oldPassword: null,
    },
  });
  return user;
};

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
