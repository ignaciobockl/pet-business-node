/**
 * @module logger
 */

import { Logger, pino } from 'pino';

/**
 * Creates a logger instance based on the environment settings.
 * If the environment is production, it sets the log level to 'info';
 * otherwise, it sets it to 'debug' and configures pretty printing for
 * easier readability.
 * @returns {Logger} The configured logger instance.
 */
const createLogger = (): Logger => {
  const isProduction = process.env.NODE_ENV === 'production';

  const logger = pino({
    level: isProduction ? 'info' : 'debug',
    transport: isProduction
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
  }) as Logger;

  return logger;
};

/**
 * The logger instance used throughout the application.
 * @type {Logger}
 */
const logger = createLogger();

export default logger;
