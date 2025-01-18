import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { UrlRepositoryPrismaDB } from '../../url.repository';
import { ConfigModule } from '../../../config/config.module';
import { UpdateUrlUseCase } from '../update-url.usecase';
import { BadRequestException } from '@nestjs/common';

describe('Update Url UseCase', () => {
  const url = {
    id: '1',
    original_url: 'string',
    shortened_url: 'string',
    access_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
    owner_id: '1',
    deleted_at: null,
  };

  const input = {
    id: '123',
    updateUrlDto: { shortened_url: 'url' },
    owner_id: '1',
  };

  let updateUrlUseCase: UpdateUrlUseCase;
  let urlRepository: UrlRepositoryPrismaDB;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: [UpdateUrlUseCase, UrlRepositoryPrismaDB, PrismaService],
    }).compile();

    updateUrlUseCase = moduleRef.get<UpdateUrlUseCase>(UpdateUrlUseCase);
    urlRepository = moduleRef.get<UrlRepositoryPrismaDB>(UrlRepositoryPrismaDB);

    jest.spyOn(urlRepository, 'getOne').mockImplementation(async () => url);

    jest
      .spyOn(urlRepository, 'getByShortenedUrl')
      .mockImplementation(async () => null);

    jest.spyOn(urlRepository, 'update').mockImplementation(async () => null);
  });

  it('should be defined', () => {
    expect(updateUrlUseCase).toBeDefined();
  });

  it('should return an success message on update url', async () => {
    const result = await updateUrlUseCase.execute(
      input.id,
      input.updateUrlDto,
      input.owner_id,
    );
    expect(result).toBeUndefined();
  });

  it('should call url repository to get url by id', async () => {
    await updateUrlUseCase.execute(
      input.id,
      input.updateUrlDto,
      input.owner_id,
    );

    expect(urlRepository.getOne).toHaveBeenCalledWith(input.id);
  });

  it('should call url repository to get url by shortened url', async () => {
    await updateUrlUseCase.execute(
      input.id,
      input.updateUrlDto,
      input.owner_id,
    );

    expect(urlRepository.getByShortenedUrl).toHaveBeenCalledWith(
      input.updateUrlDto.shortened_url,
    );
  });

  it('should call url repository to update url', async () => {
    await updateUrlUseCase.execute(
      input.id,
      input.updateUrlDto,
      input.owner_id,
    );

    expect(urlRepository.update).toHaveBeenCalledWith(
      input.id,
      input.updateUrlDto,
    );
  });

  it('should throw error if url does not belong to user', async () => {
    await expect(
      updateUrlUseCase.execute(input.id, input.updateUrlDto, 'another_user'),
    ).rejects.toThrow(new BadRequestException('Url does not belong to you!'));
  });

  it('should throw error if url already exists', async () => {
    jest
      .spyOn(urlRepository, 'getByShortenedUrl')
      .mockImplementation(async () => url);

    await expect(
      updateUrlUseCase.execute(input.id, input.updateUrlDto, input.owner_id),
    ).rejects.toThrow(new BadRequestException('Url already exists!'));
  });

  it('should throw error if url not found', async () => {
    jest.spyOn(urlRepository, 'getOne').mockImplementation(async () => null);

    await expect(
      updateUrlUseCase.execute(input.id, input.updateUrlDto, input.owner_id),
    ).rejects.toThrow(new BadRequestException('Url does not exist!'));
  });
});
