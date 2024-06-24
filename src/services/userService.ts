import { User, UserResponse } from '../models/User/user.ts';
import prisma from '../prisma.ts';
import { UserSchema } from '../schemas/userSchema.ts';
import logger from '../utils/logger.ts';
// import { CreateUserDto } from '../models/types/user.js';
// import { encryptPassword } from '../utils/encryption.ts';
// import { UserRole as PrismaUserRole } from '@prisma/client';

// ! temporalmente se utiliza este disable
// eslint-disable-next-line import/prefer-default-export
export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const users: User[] = await prisma.user.findMany();

    // ! descomentar cuando se solucione el error de entorno
    users.forEach((user) => {
      try {
        UserSchema.parse(user);
      } catch (validationError) {
        logger.error('Validation error for user:', { user, validationError });
        throw new Error(`Validation error for user with ID ${user.id}`);
      }
    });

    const usersResponse: UserResponse[] = users.map((user) => ({
      id: user.id,
      userName: user.userName,
      role: user.role,
      mail: user.mail,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt || null,
    }));
    logger.info('Users retrieved successfully');
    return usersResponse;
  } catch (error) {
    logger.error('Error retrieving users:', error);
    throw new Error('Unable to retrieve users');
  }
};

// TODO: en proceso
// export const createUser = async (userData: CreateUserDto): Promise<User> => {
//   const encryptedPassword = await encryptPassword(userData.password);

//   if (userData.role === PrismaUserRole.ADMIN)
//     throw new Error('Cannot create a user with the administrator role');

//   // TODO: verificar que el email no se encuentre registrado

//   try {
//     const user = await prisma.user.create({
//       data: {
//         ...userData,
//         password: encryptedPassword,
//         oldPassword: null,
//       },
//     });
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

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
