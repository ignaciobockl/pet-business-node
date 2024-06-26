import bcrypt from 'bcrypt';

import { comparePassword, encryptPassword } from '../encryption.ts';

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
      const invalidPassword = 'weakpwd';

      await expect(encryptPassword(invalidPassword)).rejects.toThrow(
        'Password does not meet minimum requirements'
      );
    });
    it('should encrypt a password at the maximum length limit', async () => {
      // 20 character password
      const maxLengthPassword = 'ValidPassw0rd!123456';

      // Mock bcrypt.hash to return a predefined hashed password
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      const result = await encryptPassword(maxLengthPassword);

      // Ensure bcrypt.hash was called with the correct arguments
      expect(bcrypt.hash).toHaveBeenCalledWith(
        maxLengthPassword,
        expect.any(Number)
      );
      // Ensure the result from encryptPassword is the mocked hashed password
      expect(result).toBe('hashedPassword123');
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching passwords', async () => {
      const plainPassword = 'TestPassword123!';
      const hashedPassword = await encryptPassword(plainPassword);

      // Mock bcrypt.compare to simulate password comparison
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await comparePassword(plainPassword, hashedPassword);
      expect(result).toBe(true);
    });
    it('should return false for non-matching passwords', async () => {
      const plainPassword = 'TestPassword123!';
      const hashedPassword = await encryptPassword(plainPassword);

      // Mock bcrypt.compare to simulate password comparison
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await comparePassword('WrongPassword123!', hashedPassword);
      expect(result).toBe(false);
    });
    it('should throw an error when comparison fails', async () => {
      const plainPassword = 'TestPassword123!';
      const hashedPassword = 'hashedPassword123';

      // Mock bcrypt.compare to throw an error
      (bcrypt.compare as jest.Mock).mockRejectedValue(
        new Error('Comparison error')
      );

      await expect(
        comparePassword(plainPassword, hashedPassword)
      ).rejects.toThrow('Error comparing passwords');
    });
  });
});
