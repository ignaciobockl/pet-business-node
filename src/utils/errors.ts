/**
 * Creates a validation error with the specified message.
 * @param {string} message The error message.
 * @returns {Error} The validation error.
 */
const createValidationError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'ValidationError';
  return error;
};

export default createValidationError;
