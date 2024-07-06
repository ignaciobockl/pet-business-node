import logger from '../utils/logger.ts';

logger.info(
  `Runtime environment ${JSON.stringify(process.env.NODE_ENV)} in Port ${process.env.PORT}`
);
