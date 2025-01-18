import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { UrlRepositoryPrismaDB } from '../../url.repository';
import { ConfigModule } from '../../../config/config.module';
import { GetAllUrlsUseCase } from '../get-all-urls.usecase';
import { Url } from '../../../url/entities/url.entity';

describe('Get All Urls UseCase', () => {
  const output: Url[] = [
    {
      access_count: 0,
      created_at: new Date(),
      deleted_at: null,
      id: '1',
      original_url: 'https://www.google.com',
      owner_id: null,
      updated_at: new Date(),
    },
  ];

  let getAllUrlsUseCase: GetAllUrlsUseCase;
  let urlRepository: UrlRepositoryPrismaDB;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: [GetAllUrlsUseCase, UrlRepositoryPrismaDB, PrismaService],
    }).compile();

    getAllUrlsUseCase = moduleRef.get<GetAllUrlsUseCase>(GetAllUrlsUseCase);
    urlRepository = moduleRef.get<UrlRepositoryPrismaDB>(UrlRepositoryPrismaDB);

    jest.spyOn(urlRepository, 'getAll').mockImplementation(async () => output);
  });

  it('should be defined', () => {
    expect(getAllUrlsUseCase).toBeDefined();
  });

  it('should get all urls', async () => {
    const result = await getAllUrlsUseCase.execute(null);
    const formattedOutput = output.map((url) => ({
      ...url,
      fullUrl:
        (process.env.API_URL ?? 'http://localhost:3000') +
        '/' +
        url.shortened_url,
    }));
    expect(result).toStrictEqual(formattedOutput);
  });

  it('should call getAll method from url repository', async () => {
    await getAllUrlsUseCase.execute(null);

    expect(urlRepository.getAll).toHaveBeenCalled();
  });

  it('should throw error if url repository throws error', async () => {
    jest.spyOn(urlRepository, 'getAll').mockImplementation(async () => {
      throw new Error();
    });

    await expect(getAllUrlsUseCase.execute(null)).rejects.toThrow();
  });
});
