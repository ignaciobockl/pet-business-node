import dotenv from 'dotenv';
import logger from '../utils/logger.ts';

dotenv.config({ path: '.env.test' });

logger.info(`Runtime environment ${JSON.stringify(process.env.NODE_ENV)}`);
