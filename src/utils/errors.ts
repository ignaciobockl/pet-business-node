const createValidationError = (message: string): Error => {
  const error = new Error(message);
  error.name = 'ValidationError';
  return error;
};

export default createValidationError;
