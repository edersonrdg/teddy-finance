import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class GetAllUrlsUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(owner_id: string) {
    return await this.urlRepository.getAll({ owner_id });
  }
}
