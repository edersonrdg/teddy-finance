import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { CreateUrlUseCase } from './usecases/create-url.usecase';
import { UrlRepositoryPrismaDB } from './url.repository';
import { GetUrlUseCase } from './usecases/getUrl.usecase';
import { ConfigModule } from 'src/config/config.module';
import { UrlRedirectController } from './redirect.controller';
import { GetAllUrlsUseCase } from './usecases/getAll-urls.usecase';

@Module({
  imports: [ConfigModule],
  controllers: [UrlController, UrlRedirectController],
  providers: [
    UrlRepositoryPrismaDB,
    GetUrlUseCase,
    CreateUrlUseCase,
    GetAllUrlsUseCase,
  ],
})
export class UrlModule {}
