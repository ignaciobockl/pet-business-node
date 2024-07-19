import { UserRole as PrismaUserRole } from '@prisma/client';
import { Server } from 'http';
import request from 'supertest';

import app, { startServer } from '../../../../app.ts';
import { User } from '../../../../models/User/user.ts';
import prisma from '../../../../prisma.ts';
import { generateMockCreateUser } from '../../../../services/__mocks__/mockUsers.ts';

// Define User type with optional properties for testing purposes
type PartialUser = {
  userName?: string;
  password?: string;
  mail?: string;
  role?: string;
};

describe('createUserController', () => {
  let server: Server;
  const testPort: number = Math.floor(1024 + Math.random() * 64511);

  beforeAll(async () => {
    server = await startServer(testPort);
  });

  afterAll(async () => {
    if (server) {
      await server.close();
    }
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('should create a user correctly', async () => {
    const userData: User = await generateMockCreateUser();

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(201);

    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.userName).toBe(userData.userName);
    expect(response.body.data.mail).toBe(userData.mail);
    expect(response.body.data.role).toBe(userData.role);
  });

  it('should return validation error for missing fields', async () => {
    const userData: PartialUser = await generateMockCreateUser();
    delete userData.userName;

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(400);

    expect(response.body.message).toMatch(/Missing required fields/);
  });

  it('should return validation error for invalid email', async () => {
    const userData = await generateMockCreateUser();
    userData.mail = 'invalid-email';

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(400);

    expect(response.body.message).toMatch(/The entered email is invalid/);
  });

  it('should return validation error for short username', async () => {
    const userData = await generateMockCreateUser();
    userData.userName = 'short';

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(400);

    expect(response.body.message).toMatch(
      /Username must be at least 6 characters long/
    );
  });

  it('should return error for duplicate email', async () => {
    const userData = await generateMockCreateUser();

    await request(app).post('/api/user').send(userData).expect(201);

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(400);

    expect(response.body.message).toMatch(/User with email .+ already exists/);
  });

  it('should return error for admin role', async () => {
    const userData = await generateMockCreateUser();
    userData.role = PrismaUserRole.ADMIN;

    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(400);

    expect(response.body.message).toMatch(
      /Cannot create a user with the administrator role/
    );
  });
});
