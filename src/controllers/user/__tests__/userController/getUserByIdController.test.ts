import { Server } from 'http';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import app, { startServer } from '../../../../app.ts';
import { User, UserResponse } from '../../../../models/User/user.ts';
import prisma from '../../../../prisma.ts';
import { generateMockCreateUser } from '../../../../services/__mocks__/mockUsers.ts';
import { createUserService } from '../../../../services/userService.ts';

describe('getUserByIdController', () => {
  let createUser: User;

  let newUser: UserResponse;
  let server: Server;
  const testPort: number = Math.floor(1024 + Math.random() * 64511);

  beforeAll(async () => {
    server = await startServer(testPort);

    createUser = await generateMockCreateUser();

    // Clean the database before starting tests
    await prisma.user.deleteMany();

    newUser = await createUserService(createUser);
  });

  afterAll(async () => {
    if (server) {
      await server.close();
    }
    await prisma.$disconnect();
  });

  //   afterEach(async () => {
  //     await prisma.user.deleteMany();
  //   });

  it('should return user details when user exists', async () => {
    const response = await request(app)
      .get('/api/user/' + newUser.id)
      .expect(200);

    // Check that 'data' is present in the response and that 'id' is valid and matches newUser.id
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(typeof response.body.data.id).toBe('string');
    expect(response.body.data.id).toEqual(newUser.id);

    // Verify that essential fields are present in the response and are of the correct type
    expect(response.body.data).toHaveProperty('userName');
    expect(typeof response.body.data.userName).toBe('string');
    expect(response.body.data).toHaveProperty('role');
    expect(response.body.data).toHaveProperty('mail');
    expect(typeof response.body.data.mail).toBe('string');
    expect(response.body.data).toHaveProperty('createdAt');

    // Verify that the information in the response corresponds to that user
    expect(response.body.data.userName).toEqual(newUser.userName);
    expect(response.body.data.role).toEqual(newUser.role);
    expect(response.body.data.mail).toEqual(newUser.mail);

    // Verify certain fields contain information
    expect(response.body.data.createdAt).toBeTruthy();
  });

  it('should return 404 if user does not exist', async () => {
    const nonExistingUserId = uuidv4();
    const response = await request(app)
      .get('/api/user/' + nonExistingUserId)
      .expect(404);

    expect(response.body).toHaveProperty('message', 'User not found');
  });

  // it('should handle internal server errors', async () => {
  //   // Simulates an internal error in the database
  //   jest
  //     .spyOn(prisma.user, 'findUnique')
  //     .mockRejectedValueOnce(new Error('DataBase Error'));

  //   const response = await request(app)
  //     .get('/api/user/' + newUser.id)
  //     .expect(500);

  //   expect(response.body).toHaveProperty('message', 'Internal Server Error');
  // });

  // it('should return 400 if user ID is not a valid UUID', async () => {
  //   const invalidUserId = '123';
  //   const response = await request(app)
  //     .get('/api/user/' + invalidUserId)
  //     .expect(400);

  //   expect(response.body).toHaveProperty('message', 'Invalid user ID');
  // });
});
