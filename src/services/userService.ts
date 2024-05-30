import type { User } from '@/models/User/user';
import prisma from '../prisma';
import type { CreateUserDto } from '@/models/types/user';

export const getAllUsers = async (): Promise<User[]> => prisma.user.findMany();

export const createUser = async (userData: CreateUserDto): Promise<User> =>
  prisma.user.create({
    data: userData,
  });
