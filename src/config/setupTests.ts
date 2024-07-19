import logger from '../utils/logger.ts';

import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

logger.info(
  `Runtime environment ${JSON.stringify(process.env.NODE_ENV)} in Port ${process.env.PORT}`
);
