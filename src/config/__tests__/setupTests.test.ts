import logger from '../../utils/logger.ts';

describe('Environment Configuration', () => {
  it('should load environment variables for testing', () => {
    expect(process.env.NODE_ENV).toBe('test');
    logger.info(`Environment variable NODE_ENV value: ${process.env.NODE_ENV}`);
  });
});
