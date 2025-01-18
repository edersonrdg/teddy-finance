import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { UpdateUrlDto } from '../dto/update-url.dto';

@Injectable()
export class UpdateUrlUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(id: string, updateUrlDto: UpdateUrlDto, owner_id?: string) {
    const url = await this.urlRepository.getOne(id);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    if (
      await this.urlRepository.getByShortenedUrl(updateUrlDto.shortened_url)
    ) {
      throw new BadRequestException('Url already exists!');
    }

    if (url.owner_id !== owner_id) {
      throw new BadRequestException('Url does not belong to you!');
    }

    await this.urlRepository.update(id, updateUrlDto);
  }
}
