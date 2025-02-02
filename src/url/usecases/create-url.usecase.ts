import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../dto/create-url.dto';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { ConfigService } from '../../config/config.service';
import { constants } from '../../config/constants';
import { LoggerService } from '../../Logger/logger.service';

const DEFAULT_API_URL =
  constants.DEFAULT_API_URL + ':' + constants.DEFAULT_API_PORT;

@Injectable()
export class CreateUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private configService: ConfigService,
    private logger: LoggerService,
  ) {}

  async execute(owner_id: string, createUrlDto: CreateUrlDto) {
    this.logger.log(`[CREATE_URL] Creating URL for user ${owner_id}`);
    const shortenedUrl = Math.random().toString(36).slice(2, 8);

    await this.urlRepository.create({
      shortened_url: shortenedUrl,
      owner_id,
      ...createUrlDto,
    });

    return {
      link:
        (this.configService.get('API_URL') ?? DEFAULT_API_URL) +
        '/' +
        shortenedUrl,
    };
  }
}
