import bcrypt from 'bcrypt';

import { encryptPassword } from '../encryption.ts';

// Mocking bcrypt functions for testing purposes
jest.mock('bcrypt');

describe('Password Utility Functions', () => {
  describe('encryptPassword', () => {
    it('should encrypt a valid password', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = 'hashedPassword123'; // Mock hashed password for testing

      // Mock bcrypt.hash to return a predefined hashed password
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await encryptPassword(password);

      // Ensure bcrypt.hash was called with the correct arguments
      expect(bcrypt.hash).toHaveBeenCalledWith(password, expect.any(Number));
      // Ensure the result from encryptPassword is the mocked hashed password
      expect(result).toBe(hashedPassword);
    });

    it('should throw an error for an invalid password', async () => {
      const invalidPassword = 'weakpwd'; // does not meet complexity requirements

      await expect(encryptPassword(invalidPassword)).rejects.toThrow(
        'Password does not meet minimum requirements'
      );
    });
  });
});
