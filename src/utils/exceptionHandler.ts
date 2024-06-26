import logger from './logger.ts';

const handleProcessErrors = (): void => {
  process.on('uncaughtException', (err) => {
    logger.fatal(err, 'Excepción no controlada');
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.fatal({ reason, promise }, 'Promesa no manejada');
    process.exit(1);
  });
};

export default handleProcessErrors;
