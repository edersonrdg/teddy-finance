import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { LoggerService } from '../../Logger/logger.service';
import { MetricService } from '../../metrics/metric.service';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class GetUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private logger: LoggerService,
    private metricService: MetricService,
    private redisService: RedisService,
  ) {}

  async execute(shortened_url: string) {
    this.logger.log(`[GET_URL] Getting URL for shortened url ${shortened_url}`);
    const url = await this.urlRepository.getByShortenedUrl(shortened_url);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    // increment clicks on db
    await this.redisService.incr(`${url.id}:${url.shortened_url}`);

    // increment counter metric
    this.metricService.incrementCountMetric();

    return url.original_url;
  }
}
