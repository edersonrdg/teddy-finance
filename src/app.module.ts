import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { LoggerModule } from './Logger/logger.module';

@Module({
  imports: [PrismaModule, ConfigModule, LoggerModule, AuthModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
