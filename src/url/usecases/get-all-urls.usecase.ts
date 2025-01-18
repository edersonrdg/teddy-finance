import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';

@Injectable()
export class GetAllUrlsUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(user: { sub: string; email: string }) {
    console.log(user);
    return await this.urlRepository.getAll();
  }
}
