import { IncomingMessage, Server, ServerResponse } from 'http';
import request from 'supertest';

import app from '../../../../app.ts';
import { User } from '../../../../models/User/user.ts';
import { generateMockCreateUser } from '../../../../services/__mocks__/mockUsers.ts';
import prisma from '../../../../prisma.ts';

describe('createUserController', () => {
  let server: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll(async () => {
    server = app.listen();
  });

  afterAll(async () => {
    server.close();
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
