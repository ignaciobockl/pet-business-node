import { Server } from 'http';
import request from 'supertest';

import app, { startServer } from '../../../../app.ts';
import { User } from '../../../../models/User/user.ts';
import prisma from '../../../../prisma.ts';
import { generateMockCreateUser } from '../../../../services/__mocks__/mockUsers.ts';

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
});
