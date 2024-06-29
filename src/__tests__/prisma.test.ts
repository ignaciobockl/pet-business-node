import prisma, { testConnection } from '../prisma.ts';

describe('prisma', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should connect to the database successfully', async () => {
    await expect(testConnection()).resolves.not.toThrow();
  });

  it('should disconnect from the database successfully', async () => {
    await expect(prisma.$disconnect()).resolves.not.toThrow();
  });
});
