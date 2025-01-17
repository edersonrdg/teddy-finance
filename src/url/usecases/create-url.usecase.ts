import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from '../dto/create-url.dto';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { ConfigService } from 'src/config/config.service';

const DEFAULT_API_URL = 'localhost:3000';

@Injectable()
export class CreateUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private configService: ConfigService,
  ) {}

  async execute(createUrlDto: CreateUrlDto) {
    const shortenedUrl = Math.random().toString(36).slice(2, 8);
    await this.urlRepository.create({
      shortened_url: shortenedUrl,
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
