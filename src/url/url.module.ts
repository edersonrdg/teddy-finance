import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { UrlRepositoryPrismaDB } from './url.repository';
import { GetUrlUseCase } from './usecases/get-url.usecase';
import { ConfigModule } from 'src/config/config.module';
import { UrlRedirectController } from './redirect.controller';
import { GetAllUrlsUseCase } from './usecases/get-all-urls.usecase';
import { UpdateUrlUseCase } from './usecases/update-url.usecase';
import { DeleteUrlUseCase } from './usecases/delete-url.usecase';
import { LoggerModule } from '../Logger/logger.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  controllers: [UrlController, UrlRedirectController],
  providers: [
    UrlRepositoryPrismaDB,
    GetUrlUseCase,
    CreateUrlUseCase,
    GetAllUrlsUseCase,
    UpdateUrlUseCase,
    DeleteUrlUseCase,
  ],
})
export class UrlModule {}
