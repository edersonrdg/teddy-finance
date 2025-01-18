import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  it('should be defined', () => {
    expect(new PrismaService()).toBeDefined();
  });

  it('should connect', async () => {
    const prismaService = new PrismaService();
    await prismaService.$connect();

    expect(prismaService).toBeDefined();
  });

  it('should disconnect', async () => {
    const prismaService = new PrismaService();
    await prismaService.$disconnect();

    expect(prismaService).toBeDefined();
  });
});
