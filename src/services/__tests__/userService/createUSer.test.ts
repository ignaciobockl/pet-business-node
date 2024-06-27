import { CreateUserDto } from '../../../models/types/user.js';
import { User } from '../../../models/User/user.ts';
import prisma from '../../../prisma.ts';
import { generateMockCreateUser } from '../../__mocks__/mockUsers.ts';
import { createUser } from '../../userService.ts';

describe('createUser', () => {
  beforeEach(async () => {
    // Mock de usuarios para simular datos en la base de datos
    // const mockUsers = await generateMockUsers();
    // Antes de cada prueba, limpiar y preparar el estado necesario
    await prisma.user.deleteMany(); // Elimina todos los usuarios antes de cada prueba
    // Inserta los usuarios de prueba en la base de datos
    // await prisma.user.createMany({
    //   data: mockUsers,
    // });
  });

  afterAll(async () => {
    // Después de todas las pruebas, asegurarse de limpiar la base de datos
    await prisma.$disconnect();
  });

  // TODO: crear una db para test

  it('should create a new user', async () => {
    const mockUser: User[] = await generateMockCreateUser();
    const userData: CreateUserDto = mockUser[0];

    const createdUser = await createUser(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser.userName).toBe(userData.userName);
    expect(createdUser.mail).toBe(userData.mail);
    expect(createdUser.role).toBe(userData.role);
    expect(createdUser.createdAt).toBeDefined();
  });
});
