import { UserRole as PrismaUserRole } from '@prisma/client';

import { CreateUserDto } from '../../../models/types/user.js';
import { User } from '../../../models/User/user.ts';
import prisma from '../../../prisma.ts';
import { generateMockCreateUser } from '../../__mocks__/mockUsers.ts';
import { createUser } from '../../userService.ts';

describe('createUser', () => {
  let userData: CreateUserDto;

  beforeAll(async () => {
    // Genera el usuario de prueba una vez para todas las pruebas
    const mockUser: User[] = await generateMockCreateUser();
    userData = mockUser[0];
  });
  beforeEach(async () => {
    // Antes de cada prueba, limpiar y preparar el estado necesario
    await prisma.user.deleteMany(); // Elimina todos los usuarios antes de cada prueba
  });

  afterAll(async () => {
    // Después de todas las pruebas, asegurarse de limpiar la base de datos
    await prisma.$disconnect();
  });

  // TODO: crear una db para test

  it('should create a new user', async () => {
    const createdUser = await createUser(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser.userName).toBe(userData.userName);
    expect(createdUser.mail).toBe(userData.mail);
    expect(createdUser.role).toBe(userData.role);
    expect(createdUser.createdAt).toBeDefined();
  });

  it('should throw validation error for invalid user data', async () => {
    const invalidUserData: CreateUserDto = {
      ...userData,
      mail: 'invalid-email',
    };

    await expect(createUser(invalidUserData)).rejects.toThrow(
      /Validation error creating user/
    );
  });

  it('should throw an error if user with the same email already exists', async () => {
    // Create the first user and verify it was created successfully
    const firstUser = await createUser(userData);
    expect(firstUser).toBeDefined();

    // Attempt to create a second user with the same email and expect an error
    await expect(createUser(userData)).rejects.toThrow(
      /Error in createUser: User with email .+ already exists/
    );
  });

  it('should throw an error if trying to create a user with ADMIN role', async () => {
    const mockUser: User[] = await generateMockCreateUser();
    const userDataModified: CreateUserDto = {
      ...mockUser[0],
      role: PrismaUserRole.ADMIN,
    };

    await expect(createUser(userDataModified)).rejects.toThrow(
      /Cannot create a user with the administrator role/
    );
  });
});
