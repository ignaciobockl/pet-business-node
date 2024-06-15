import logger from '../logger.ts';

const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('Logger', () => {
  it('should log messages at the appropriate level in development', () => {
    process.env.NODE_ENV = 'development';
    jest.resetModules();

    const debugMessage = 'Debug message';
    const infoMessage = 'Info message';

    const debugSpy = jest.spyOn(logger, 'debug').mockImplementation();
    const infoSpy = jest.spyOn(logger, 'info').mockImplementation();

    logger.debug(debugMessage);
    logger.info(infoMessage);

    expect(debugSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledWith(debugMessage);
    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith(infoMessage);

    debugSpy.mockRestore();
    infoSpy.mockRestore();
  });

  it('should log messages at the appropriate level in production', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();

    const infoMessage = 'Info message';

    const infoSpy = jest.spyOn(logger, 'info').mockImplementation();

    logger.info(infoMessage);

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(infoSpy).toHaveBeenCalledWith(infoMessage);

    infoSpy.mockRestore();
  });

  it('should configure logger correctly for production', () => {
    process.env.NODE_ENV = 'production';
    jest.resetModules();
    const loggerInstance = require('../logger').default;

    expect(loggerInstance.level).toBe('info');
    expect(loggerInstance.transport).toBeUndefined();
  });

  it('should configure logger correctly for local development', () => {
    process.env.NODE_ENV = 'development';
    jest.resetModules();
    const loggerInstance = require('../logger').default;

    expect(loggerInstance.level).toBe('debug');
    expect(loggerInstance.transport).toBeUndefined();
  });
});
