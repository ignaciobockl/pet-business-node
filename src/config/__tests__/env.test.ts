import logger from '../../utils/logger.ts';
import dotenv from 'dotenv';

describe('setupTest', () => {
  it('should load environment variables for testing', () => {
    dotenv.config({ path: '.env.test' });
    expect(process.env.NODE_ENV).toBeDefined();
    logger.info('Environment variable value:', process.env.TEST_ENV_VARIABLE);
  });
});
