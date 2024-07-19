import { UserRole as PrismaUserRole } from '@prisma/client';

export interface CreateUserDto {
  userName: string;
  password: string;
  role: PrismaUserRole;
  mail: string;
  // person?: Person;
}
