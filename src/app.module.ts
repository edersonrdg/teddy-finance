import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { LoggerModule } from './Logger/logger.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
    PrometheusModule.register(),
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
