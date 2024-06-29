import { PrismaClient } from '@prisma/client';

import logger from './utils/logger.ts';

const prisma = new PrismaClient();

export const testConnection = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Conexión a PostgreSQL exitosa');
  } catch (error) {
    logger.error('Error al conectar a PostgreSQL:', error);
  }
};

export const disconnectPrisma = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('Desconexión de PostgreSQL exitosa');
  } catch (error) {
    logger.error('Error al desconectar de PostgreSQL:', error);
  }
};

export default prisma;
