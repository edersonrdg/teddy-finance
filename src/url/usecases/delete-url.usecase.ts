import { BadRequestException, Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class DeleteUrlUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(id: string, owner_id?: string) {
    const url = await this.urlRepository.getOne(id);

    if (!url) {
      throw new BadRequestException('Url does not exist!');
    }

    if (url.owner_id !== owner_id) {
      throw new BadRequestException('Url does not belong to you!');
    }

    await this.urlRepository.delete(id);
  }
}
