import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [PrismaModule, ConfigModule, AuthModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
