import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { LoggerModule } from './Logger/logger.module';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
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
