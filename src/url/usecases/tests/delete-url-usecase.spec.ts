import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { UrlRepositoryPrismaDB } from '../../url.repository';
import { ConfigModule } from '../../../config/config.module';
import { DeleteUrlUseCase } from '../delete-url.usecase';

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
    owner_id: '1',
  };

  let deleteUrlUseCase: DeleteUrlUseCase;
  let urlRepository: UrlRepositoryPrismaDB;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [],
      providers: [DeleteUrlUseCase, UrlRepositoryPrismaDB, PrismaService],
    }).compile();

    deleteUrlUseCase = moduleRef.get<DeleteUrlUseCase>(DeleteUrlUseCase);
    urlRepository = moduleRef.get<UrlRepositoryPrismaDB>(UrlRepositoryPrismaDB);

    jest.spyOn(urlRepository, 'getOne').mockImplementation(async () => url);
    jest.spyOn(urlRepository, 'delete').mockImplementation(async () => null);
  });

  it('should be defined', () => {
    expect(deleteUrlUseCase).toBeDefined();
  });

  it('should return an success message on delete url', async () => {
    const result = await deleteUrlUseCase.execute(input.id, input.owner_id);
    expect(result).toBeUndefined();
  });

  it('should call url repository to get url by id', async () => {
    await deleteUrlUseCase.execute(input.id, input.owner_id);

    expect(urlRepository.getOne).toHaveBeenCalledWith(input.id);
  });

  it('should call url repository to delete url', async () => {
    await deleteUrlUseCase.execute(input.id, input.owner_id);

    expect(urlRepository.delete).toHaveBeenCalledWith(input.id);
  });

  it('should throw error if owner id does not match', async () => {
    await expect(
      deleteUrlUseCase.execute(input.id, 'another_owner'),
    ).rejects.toThrow(new Error('Url does not belong to you!'));
  });

  it('should throw error if url not found', async () => {
    jest.spyOn(urlRepository, 'getOne').mockImplementation(async () => null);

    await expect(
      deleteUrlUseCase.execute(input.id, input.owner_id),
    ).rejects.toThrow(new Error('Url does not exist!'));
  });
});
