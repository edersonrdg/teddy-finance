import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { UrlRepositoryPrismaDB } from '../../url.repository';
import { ConfigModule } from '../../../config/config.module';
import { GetUrlUseCase } from '../get-url.usecase';

describe('Get Url UseCase', () => {
  const url = {
    id: '1',
    original_url: 'string',
    shortened_url: 'string',
    access_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };
  let getUrlUseCase: GetUrlUseCase;
  let urlRepository: UrlRepositoryPrismaDB;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: [GetUrlUseCase, UrlRepositoryPrismaDB, PrismaService],
    }).compile();

    getUrlUseCase = moduleRef.get<GetUrlUseCase>(GetUrlUseCase);
    urlRepository = moduleRef.get<UrlRepositoryPrismaDB>(UrlRepositoryPrismaDB);

    jest
      .spyOn(urlRepository, 'getByShortenedUrl')
      .mockImplementation(async () => url);

    jest
      .spyOn(urlRepository, 'incrementClicks')
      .mockImplementation(async () => null);
  });

  it('should be defined', () => {
    expect(getUrlUseCase).toBeDefined();
  });

  it('should get url', async () => {
    const result = await getUrlUseCase.execute(url.shortened_url);
    expect(result).toEqual(url.original_url);
  });

  it('should call url repository to get url', async () => {
    await getUrlUseCase.execute(url.shortened_url);

    expect(urlRepository.getByShortenedUrl).toHaveBeenCalledWith(
      url.shortened_url,
    );
  });

  it('should call url repository to increment clicks', async () => {
    await getUrlUseCase.execute(url.shortened_url);

    expect(urlRepository.incrementClicks).toHaveBeenCalledWith(url);
  });

  it('should throw error if url not found', async () => {
    jest
      .spyOn(urlRepository, 'getByShortenedUrl')
      .mockImplementation(async () => null);

    await expect(getUrlUseCase.execute(url.shortened_url)).rejects.toThrow(
      new Error('Url does not exist!'),
    );
  });
});
