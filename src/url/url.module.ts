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
import { MetricModule } from 'src/metrics/metric.module';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [ConfigModule, LoggerModule, MetricModule],
  controllers: [UrlController, UrlRedirectController],
  providers: [
    RedisService,
    UrlRepositoryPrismaDB,
    GetUrlUseCase,
    CreateUrlUseCase,
    GetAllUrlsUseCase,
    UpdateUrlUseCase,
    DeleteUrlUseCase,
  ],
})
export class UrlModule {}
