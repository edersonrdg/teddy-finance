import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class DeleteUrlUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(id: string) {
    await this.urlRepository.delete(id);
  }
}
