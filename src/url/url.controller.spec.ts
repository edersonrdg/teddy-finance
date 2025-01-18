import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlRepositoryPrismaDB } from './url.repository';
import { GetUrlUseCase } from './usecases/get-url.usecase';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { GetAllUrlsUseCase } from './usecases/get-all-urls.usecase';
import { UpdateUrlUseCase } from './usecases/update-url.usecase';
import { DeleteUrlUseCase } from './usecases/delete-url.usecase';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '../config/config.module';
import { JwtModule } from '@nestjs/jwt';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, PrismaModule, JwtModule.register({})],
      controllers: [UrlController],
      providers: [
        UrlRepositoryPrismaDB,
        GetUrlUseCase,
        CreateUrlUseCase,
        GetAllUrlsUseCase,
        UpdateUrlUseCase,
        DeleteUrlUseCase,
      ],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
