import { UserRole as PrismaUserRole } from '@prisma/client';

export interface User {
  id: string;
  userName: string;
  password: string;
  oldPassword?: string[];
  role: PrismaUserRole;
  mail: string;
  // person?: Person | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface UserResponse {
  id: string;
  userName: string;
  role: PrismaUserRole;
  mail: string;
  createdAt: Date;
  updatedAt?: Date | null;
}
