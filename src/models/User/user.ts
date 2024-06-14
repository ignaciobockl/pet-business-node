import { UserRole as PrismaUserRole } from '@prisma/client';

export interface User {
  id: string;
  userName: string;
  password: string;
  oldPassword?: string | null;
  role: PrismaUserRole;
  mail: string;
  // person?: Person | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
