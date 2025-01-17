import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [PrismaModule, ConfigModule, AuthModule, UrlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
