import { HashingService } from '.';

describe('HashingService', () => {
  it('should be defined', () => {
    expect(new HashingService()).toBeDefined();
  });

  it('should hash password', () => {
    const hashingService = new HashingService();

    expect(hashingService.hashPassword('password')).not.toBe('password');
  });

  it('should compare password', () => {
    const hashingService = new HashingService();

    const password = hashingService.hashPassword('password');

    expect(hashingService.comparePassword('password', password)).toBe(true);
  });
});
