import { ValidationError } from './interface/index.js';

/**
 * Creates a validation error with the specified message, optional details, and missing fields.
 * @param {string} message The error message.
 * @param {unknown} [details] Optional details to include in the error.
 * @param {string[]} [missingFields] Optional missing fields to include in the error.
 * @returns {ValidationError} The validation error.
 */
const createValidationError = (
  message: string,
  details?: unknown,
  missingFields?: string[]
): ValidationError => {
  const error: ValidationError = new Error(message);
  error.name = 'ValidationError';
  if (details) {
    error.details = details;
  }
  if (missingFields) {
    error.missingFields = missingFields;
  }
  return error;
};

export default createValidationError;
