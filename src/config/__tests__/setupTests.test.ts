import logger from '../../utils/logger.ts';
import dotenv from 'dotenv';

describe('Environment Configuration', () => {
  beforeAll(() => {
    dotenv.config({ path: '.env.test' });
  });

  it('should load environment variables for testing', () => {
    expect(process.env.NODE_ENV).toBe('test');
    logger.info(`Environment variable NODE_ENV value: ${process.env.NODE_ENV}`);
  });
});
