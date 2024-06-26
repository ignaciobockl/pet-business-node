interface ValidationError extends Error {
  details?: unknown;
}

/**
 * Creates a validation error with the specified message and optional details.
 * @param {string} message The error message.
 * @param {unknown} [details] Optional details to include in the error.
 * @returns {ValidationError} The validation error.
 */
const createValidationError = (
  message: string,
  details?: unknown
): ValidationError => {
  const error: ValidationError = new Error(message);
  error.name = 'ValidationError';
  if (details) {
    error.details = details;
  }
  return error;
};

export default createValidationError;
