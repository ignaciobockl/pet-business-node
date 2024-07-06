import { UserRole as PrismaUserRole } from '@prisma/client';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from '../models/types/user.js';
import { User, UserResponse } from '../models/User/user.ts';
import prisma from '../prisma.ts';
import { CreateUserSchema, UserSchema } from '../schemas/userSchema.ts';
import { encryptPassword } from '../utils/encryption.ts';
import createValidationError from '../utils/errors.ts';
import logger from '../utils/logger.ts';

export const getAllUsersService = async (): Promise<UserResponse[]> => {
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
export const createUserService = async (
  userData: CreateUserDto
): Promise<User> => {
  // const encryptedPassword = await encryptPassword(userData.password);

  try {
    try {
      // Validate user data using Zod
      CreateUserSchema.parse(userData);
    } catch (validationError) {
      const errorMessage = `Validation error creating user: ${validationError instanceof Error ? validationError.message : 'Validation error occurred'}`;
      logger.error(errorMessage, { validationError });
      throw createValidationError(errorMessage, validationError);
    }

    if (userData.role === PrismaUserRole.ADMIN) {
      const errorMessage = 'Cannot create a user with the administrator role';
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        mail: userData.mail,
      },
    });

    if (existingUser) {
      const errorMessage = `User with email ${userData.mail} already exists`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const hashedPassword = await encryptPassword(userData.password);

    try {
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          userName: userData.userName,
          password: hashedPassword,
          mail: userData.mail,
          role: userData.role,
          createdAt: new Date(dayjs().toISOString()),
          updatedAt: null,
        },
      });
      logger.info('User created successfully', { user });
      return user;
    } catch (error) {
      const errorMessage = 'Error creating user';
      logger.error(errorMessage, { error });
      throw error;
    }
  } catch (error) {
    const errorMessage = `Error in createUser: ${error instanceof Error ? error.message : 'An error occurred'}`;
    logger.error(errorMessage, { error });
    if (error instanceof Error && error.name === 'ValidationError') {
      throw error;
    }
    throw new Error(errorMessage);
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
