import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { LoggerService } from '../../Logger/logger.service';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class GetUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private logger: LoggerService,
    @InjectMetric('url_redirections_total') public counter: Counter<string>,
  ) {}

  async execute(shortened_url: string) {
    this.logger.log(`[GET_URL] Getting URL for shortened url ${shortened_url}`);
    const url = await this.urlRepository.getByShortenedUrl(shortened_url);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    // increment clicks
    await this.urlRepository.incrementClicks(url);
    this.counter.inc();

    return url.original_url;
  }
}
