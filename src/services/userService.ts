import { UserRole as PrismaUserRole } from '@prisma/client';

import { CreateUserDto } from '../models/types/user.js';
import { User, UserResponse } from '../models/User/user.ts';
import prisma from '../prisma.ts';
import { CreateUserSchema, UserSchema } from '../schemas/userSchema.ts';
import createValidationError from '../utils/errors.ts';
import logger from '../utils/logger.ts';

export const getAllUsers = async (): Promise<UserResponse[]> => {
  try {
    const users: User[] = await prisma.user.findMany();

    users.forEach((user) => {
      try {
        UserSchema.parse(user);
      } catch (validationError) {
        logger.error('Validation error for user:', { user, validationError });
        throw createValidationError(
          `Validation error for user with ID ${user.id}`
        );
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
    if (error instanceof Error && error.name === 'ValidationError') {
      throw error;
    }
    throw new Error('Unable to retrieve users');
  }
};

// eslint-disable-next-line complexity
export const createUser = async (userData: CreateUserDto): Promise<User> => {
  // const encryptedPassword = await encryptPassword(userData.password);

  try {
    // Validate user data using Zod
    CreateUserSchema.parse(userData);

    if (userData.role === PrismaUserRole.ADMIN) {
      logger.error('Cannot create a user with the administrator role');
      throw new Error('Cannot create a user with the administrator role');
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        mail: userData.mail,
      },
    });

    if (existingUser) {
      logger.error(`User with email ${userData.mail} already exists`);
      throw new Error(`User with email ${userData.mail} already exists`);
    }

    try {
      const user = await prisma.user.create({
        data: {
          ...userData,
          // password: encryptedPassword,
        },
      });
      return user;
    } catch (error) {
      logger.error('Error creating user:', error);
      throw error;
    }
  } catch (validationError) {
    logger.error('Validation error creating user:', validationError);
    const errorMessage = 'Validation error occurred';
    throw createValidationError(
      `Validation error creating user: ${errorMessage}`,
      validationError
    );
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
