import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RedisService } from './redis/redis.service';
import { LoggerService } from './Logger/logger.service';
import { UrlRepositoryPrismaDB } from './url/url.repository';

@Injectable()
export class SyncCountService {
  constructor(
    private redisService: RedisService,
    private loggerService: LoggerService,
    private urlRepository: UrlRepositoryPrismaDB,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const keys = await this.redisService.keys('*');

    this.loggerService.log(
      `[SYNC_COUNT] Syncing count for ${keys.length} keys`,
    );
    for (const key of keys) {
      const id = key.split(':')[0];
      const count = await this.redisService.get(key);
      const url = await this.urlRepository.getOne(id);

      if (url) {
        await this.urlRepository.incrementClicks(url, parseInt(count));
        await this.redisService.del(key);
      }
    }
  }
}
