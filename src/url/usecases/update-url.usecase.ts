import { Injectable } from '@nestjs/common';
import { UrlRepositoryPrismaDB } from '../url.repository';
import { UpdateUrlDto } from '../dto/update-url.dto';

@Injectable()
export class UpdateUrlUseCase {
  constructor(private urlRepository: UrlRepositoryPrismaDB) {}

  async execute(id: string, updateUrlDto: UpdateUrlDto) {
    await this.urlRepository.update(id, updateUrlDto);
  }
}
