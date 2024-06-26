import bcrypt from 'bcrypt';

import logger from './logger.ts';

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
const saltRounds = 10;

export const encryptPassword = async (password: string): Promise<string> => {
  // Basic password validation
  if (!passwordRegex.test(password)) {
    const errorMessage = 'Password does not meet minimum requirements';
    logger.error(errorMessage);
    throw new Error(errorMessage);
  }

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
