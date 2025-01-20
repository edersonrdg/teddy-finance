import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { LoggerService } from '../../Logger/logger.service';

@Injectable()
export class DeleteUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private logger: LoggerService,
  ) {}

  async execute(id: string, owner_id?: string) {
    this.logger.log(`[DELETE_URL] Deleting URL for user ${owner_id}`);
    const url = await this.urlRepository.getOne(id);

    if (!url) {
      throw new NotFoundException('Url does not exist!');
    }

    if (url.owner_id !== owner_id) {
      throw new UnauthorizedException('Url does not belong to you!');
    }

    await this.urlRepository.delete(id);
  }
}
