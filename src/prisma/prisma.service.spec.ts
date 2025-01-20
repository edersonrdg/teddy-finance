import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('should be defined', () => {
    expect(new PrismaService()).toBeDefined();
  });
});
