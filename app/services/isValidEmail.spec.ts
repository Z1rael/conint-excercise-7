import { isValidEmail } from './isValidEmail';

describe('isValidEmail Tests', () => {
  
  describe('UT: isValidEmail', () => {
    it('should return true for a valid email', () => {
      const result = isValidEmail('test.user@example.com');
      expect(result).toBe(true);
    });

    it('should return false for missing @', () => {
      const result = isValidEmail('invalidemail.com');
      expect(result).toBe(false);
    });
  });
});
