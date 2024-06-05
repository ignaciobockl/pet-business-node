import { UserRole } from '@prisma/client';

export interface CreateUserDto {
  userName: string;
  password: string;
  oldPassword?: string | null;
  role: UserRole;
  mail: string;
  // person?: Person;
}
