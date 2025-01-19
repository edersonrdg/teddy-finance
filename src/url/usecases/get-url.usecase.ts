import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { LoggerService } from '../../Logger/logger.service';

@Injectable()
export class GetUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private logger: LoggerService,
  ) {}

  async execute(shortened_url: string) {
    this.logger.log(`[GET_URL] Getting URL for shortened url ${shortened_url}`);
    const url = await this.urlRepository.getByShortenedUrl(shortened_url);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    await this.urlRepository.incrementClicks(url);

    return url.original_url;
  }
}
