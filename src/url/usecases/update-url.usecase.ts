import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { UpdateUrlDto } from '../dto/update-url.dto';
import { LoggerService } from '../../Logger/logger.service';

@Injectable()
export class UpdateUrlUseCase {
  constructor(
    private urlRepository: UrlRepositoryPrismaDB,
    private logger: LoggerService,
  ) {}

  async execute(id: string, updateUrlDto: UpdateUrlDto, owner_id?: string) {
    this.logger.log(`[UPDATE_URL] Updating URL for user ${owner_id}`);
    const url = await this.urlRepository.getOne(id);

    if (!url) {
      throw new NotFoundException('Url does not exist!');
    }

    if (url.owner_id !== owner_id) {
      throw new UnauthorizedException('Url does not belong to you!');
    }

    await this.urlRepository.update(id, updateUrlDto);
  }
}
