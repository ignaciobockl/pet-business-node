import prisma, { testConnection } from '../prisma.ts';

describe('Prisma', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to the database successfully', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });
});
