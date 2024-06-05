import type { User } from '@/models/User/user.ts';
import prisma from '../prisma.ts';
import type { CreateUserDto } from '@/models/types/user.d.ts';

export const getAllUsers = async (): Promise<User[]> => prisma.user.findMany();

export const createUser = async (userData: CreateUserDto): Promise<User> =>
  prisma.user.create({
    data: userData,
  });
