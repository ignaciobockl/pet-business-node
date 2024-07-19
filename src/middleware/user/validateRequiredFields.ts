import { User } from '../../models/User/user.ts';
import createValidationError from '../../utils/errors.ts';

/**
 * Defines the required fields from the User model for request validation.
 */
interface RequestBody
  extends Required<Pick<User, 'userName' | 'password' | 'mail' | 'role'>> {
  [key: string]: unknown;
}

/**
 * Validates the required fields in the request body.
 * Throws an error if any required field is missing.
 * @param {RequestBody} body The request body to validate.
 * @returns {void}
 * @throws {Error} If any required field is missing.
 */
const validateRequiredFields = (body: RequestBody): void => {
  const requiredFields = ['userName', 'password', 'mail', 'role'];
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
    throw createValidationError(errorMessage, undefined, missingFields);
  }
};

export default validateRequiredFields;
