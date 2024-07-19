import { UserRole as PrismaUserRole } from '@prisma/client';

import { BaseEntity } from '../index.ts';

export interface User extends BaseEntity {
  userName: string;
  password: string;
  oldPassword?: string[];
  role: PrismaUserRole;
  mail: string;
  // person?: Person | null;
}

export interface UserResponse extends BaseEntity {
  userName: string;
  role: PrismaUserRole;
  mail: string;
}
