import bcrypt from 'bcrypt';

import logger from './logger.ts';

const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    const errorMessage = 'Error encrypting password';
    logger.error(`${errorMessage}:`, error);
    throw new Error(errorMessage);
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    const errorMessage = 'Error comparing passwords';
    logger.error(`${errorMessage}:`, error);
    throw new Error(errorMessage);
  }
};
