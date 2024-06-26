import { UserRole as PrismaUserRole } from '@prisma/client';
import { z } from 'zod';

export const UserRoleSchema = z.nativeEnum(PrismaUserRole);

export type UserRoleEnumType = `${z.infer<typeof UserRoleSchema>}`;

export const UserSchema = z.object({
  id: z.string(),
  userName: z.string(),
  mail: z.string().email(),
  role: UserRoleSchema,
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type User = z.infer<typeof UserSchema>;
