import { PrismaClient } from '@prisma/client';

import logger from './utils/logger.ts';

const prisma = new PrismaClient();

export const connectDatabase = async (): Promise<void> => {
  try {
    await prisma.$connect();
    logger.info('Connection to PostgreSQL successful');
  } catch (error) {
    logger.error('Error connecting to PostgreSQL:', error);
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    logger.info('PostgreSQL disconnection successful');
  } catch (error) {
    logger.error('Error disconnecting from PostgreSQL:', error);
  }
};

export default prisma;
