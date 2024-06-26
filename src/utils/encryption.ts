import bcrypt from 'bcrypt';

import logger from './logger.ts';

/**
 * Regular expression to enforce password complexity requirements.
 * Requirements:
 * - At least 8 characters
 * - At most 20 characters
 * - At least 1 lowercase letter
 * - At least 1 uppercase letter
 * - At least 1 digit
 * - At least 1 special character (e.g., @, #, $, etc.)
 */
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;

/**
 * Number of salt rounds used for bcrypt hashing.
 * Higher rounds increase the computational cost of hashing.
 */
const saltRounds = 10;

/**
 * Encrypts a password using bcrypt hashing.
 * Throws an error if the password does not meet minimum complexity requirements
 * or if an error occurs during the encryption process.
 *
 * @param password - The password to encrypt.
 * @returns A promise that resolves to the hashed password string.
 * @throws Error if the password does not meet complexity requirements or encryption fails.
 */
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

/**
 * Compares a plain-text password with a hashed password to verify if they match.
 * Throws an error if an error occurs during the comparison process.
 *
 * @param password - The plain-text password to compare.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns A promise that resolves to true if the passwords match, false otherwise.
 * @throws Error if an error occurs during the comparison process.
 */
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
