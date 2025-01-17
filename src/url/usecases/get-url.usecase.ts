import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class GetUrlUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(shortened_url: string) {
    const url = await this.urlRepository.getByShortenedUrl(shortened_url);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    return url.original_url;
  }
}
