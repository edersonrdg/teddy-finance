import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUrlUseCase } from '../create-url.usecase';
import { UrlRepositoryPrismaDB } from '../../url.repository';
import { ConfigModule } from '../../../config/config.module';
import { LoggerModule } from '../../../Logger/logger.module';
import { LoggerService } from '../../../Logger/logger.service';

describe('Create Url UseCase', () => {
  const input = {
    original_url: 'https://www.google.com',
  };

  let createUrlUseCase: CreateUrlUseCase;
  let urlRepository: UrlRepositoryPrismaDB;
  let logger: LoggerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule, LoggerModule],
      controllers: [],
      providers: [CreateUrlUseCase, UrlRepositoryPrismaDB, PrismaService],
    }).compile();

    logger = moduleRef.get<LoggerService>(LoggerService);
    createUrlUseCase = moduleRef.get<CreateUrlUseCase>(CreateUrlUseCase);
    urlRepository = moduleRef.get<UrlRepositoryPrismaDB>(UrlRepositoryPrismaDB);

    jest.spyOn(urlRepository, 'create').mockImplementation(async () => null);

    jest.spyOn(logger, 'log').mockImplementation();
  });

  it('should be defined', () => {
    expect(createUrlUseCase).toBeDefined();
  });

  it('should return an success message on create url', async () => {
    const result = await createUrlUseCase.execute(null, input);
    expect(result).toHaveProperty('link');
  });

  it('should call create method from url repository', async () => {
    await createUrlUseCase.execute(null, input);

    expect(urlRepository.create).toHaveBeenCalled();
  });

  it('should throw an error on create url if urlRepository.create throw an error', async () => {
    jest.spyOn(urlRepository, 'create').mockImplementation(async () => {
      throw new Error();
    });

    await expect(createUrlUseCase.execute(null, input)).rejects.toThrow();
  });
});
