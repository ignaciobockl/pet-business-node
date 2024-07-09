// eslint-disable-next-line import/no-cycle
import app from './app.ts';
import { connectDatabase } from './prisma.ts';
import handleAppShutdown from './utils/handleAppShutdown.ts';
import logger from './utils/logger.ts';

const startServer = async (port: number): Promise<void> => {
  try {
    await connectDatabase();
    const server = app.listen(port, () => {
      const msg = `Server running in the environment ${process.env.NODE_ENV}, in the port ${port}`;
      if (process.env.NODE_ENV === 'production') {
        logger.info(msg);
      } else if (process.env.NODE_ENV === 'test') {
        logger.debug(msg);
      } else {
        logger.debug(msg);
      }
    });

    handleAppShutdown(server);

    await Promise.resolve();
  } catch (error) {
    logger.error('Failed to connect to database:', error);
    await Promise.reject(error);
  }
};

export default startServer;
