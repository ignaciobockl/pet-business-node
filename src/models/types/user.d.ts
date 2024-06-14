import { UserRole as PrismaUserRole } from '@prisma/client';

export interface CreateUserDto {
  userName: string;
  password: string;
  oldPassword?: string | null;
  role: PrismaUserRole;
  mail: string;
  // person?: Person;
}
