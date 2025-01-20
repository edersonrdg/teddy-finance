import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { LoggerModule } from './Logger/logger.module';
import { MetricModule } from './metrics/metric.module';
import { RedisCacheModule } from './redis/redis.module';

@Module({
  imports: [
    RedisCacheModule,
    MetricModule,
    ConfigModule,
    PrismaModule,
    LoggerModule,
    AuthModule,
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
