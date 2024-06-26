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

export const CreateUserSchema = z.object({
  userName: z.string().min(3),
  password: z.string().min(8),
  role: UserRoleSchema,
  mail: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
