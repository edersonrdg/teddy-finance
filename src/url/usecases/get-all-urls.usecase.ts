import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class GetAllUrlsUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute() {
    return await this.urlRepository.getAll();
  }
}
