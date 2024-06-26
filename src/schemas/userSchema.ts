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

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

export const CreateUserSchema = z.object({
  userName: z
    // eslint-disable-next-line camelcase
    .string({ required_error: 'Username is required' })
    .min(6, {
      message: 'Username must be at least 6 characters long',
    })
    .max(16, {
      message: 'Username must be at most 16 characters long',
    }),
  password: z
    // eslint-disable-next-line camelcase
    .string({ required_error: 'Password is required' })
    .regex(passwordRegex, {
      message:
        'Password must be between 8 and 20 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
    }),
  role: UserRoleSchema,
  mail: z
    // eslint-disable-next-line camelcase
    .string({ required_error: 'Email address is required' })
    .email({ message: 'The entered email is invalid' }),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
