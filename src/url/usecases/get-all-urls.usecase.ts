import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { ConfigService } from '../../config/config.service';
import { constants } from '../../config/constants';

const DEFAULT_API_URL =
  constants.DEFAULT_API_URL + ':' + constants.DEFAULT_API_PORT;

@Injectable()
export class GetAllUrlsUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private configService: ConfigService,
  ) {}

  async execute(owner_id: string) {
    const urls = await this.urlRepository.getAll({ owner_id });
    return urls.map((url) => ({
      ...url,
      fullUrl:
        (this.configService.get('API_URL') ?? DEFAULT_API_URL) +
        '/' +
        url.shortened_url,
    }));
  }
}
