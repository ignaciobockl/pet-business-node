import { Person } from '../Person/person.ts';

import { UserRole } from '@prisma/client';

export interface User {
  id: string;
  userName: string;
  password: string;
  oldPassword?: string | null;
  role: UserRole;
  mail: string;
  person?: Person | null;
  createdAt: Date;
  updatedAt?: Date | null;
}
