import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const testConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    console.log('Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('Error al conectar a PostgreSQL:', error);
  } finally {
    await prisma.$disconnect();
  }
};

export default prisma;
