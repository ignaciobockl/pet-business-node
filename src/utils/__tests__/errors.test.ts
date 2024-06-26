import createValidationError from '../errors.ts';

describe('createValidationError', () => {
  it('should create a validation error with the specified message', () => {
    const errorMessage = 'Invalid data';
    const error = createValidationError(errorMessage);

    expect(error instanceof Error).toBe(true);
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe(errorMessage);
  });

  it('should create a validation error with details', () => {
    const errorMessage = 'Invalid data';
    const details = { field: 'value' };
    const error = createValidationError(errorMessage, details);

    expect(error instanceof Error).toBe(true);
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe(errorMessage);
    expect(error.details).toEqual(details);
  });

  it('should create a validation error without details if not provided', () => {
    const errorMessage = 'Invalid data';
    const error = createValidationError(errorMessage);

    expect(error instanceof Error).toBe(true);
    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe(errorMessage);
    expect(error.details).toBeUndefined();
  });
});
