import createValidationError from '../errors.ts';

describe('createValidationError', () => {
  it('should create a validation error with the specified message', () => {
    const errorMessage = 'Invalid data';
    const error = createValidationError(errorMessage);

    expect(error instanceof Error).toBe(true);
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe(errorMessage);
  });
});
