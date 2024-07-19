import { Server } from 'http';

import { disconnectDatabase } from '../prisma.ts';
import logger from './logger.ts';

const handleAppShutdown = (server: Server): void => {
  // disconnection when 'Ctrl + C' is pressed
  process.on('SIGINT', async () => {
    logger.info('Cerrando la aplicación...');
    await disconnectDatabase();
    server.close(() => {
      logger.info('Servidor cerrado');
      process.exit(0);
    });
  });

  // disconnection when the process is called
  process.on('SIGTERM', async () => {
    logger.info('Cerrando la aplicación...');
    await disconnectDatabase();
    server.close(() => {
      logger.info('Servidor cerrado');
      process.exit(0);
    });
  });
};

export default handleAppShutdown;
