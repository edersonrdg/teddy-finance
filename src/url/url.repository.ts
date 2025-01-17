import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Url } from './entities/url.entity';
import { UpdateUrlDto } from './dto/update-url.dto';

export interface UrlRepository {
  create(input: UrlInput): Promise<Url>;
  getAll(): Promise<Url[]>;
  getByShortenedUrl(shortenedUrl: string): Promise<Url>;
  update(id: string, input: UpdateUrlDto): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UrlRepositoryPrismaDB implements UrlRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: UrlInput): Promise<Url> {
    return this.prismaService.url.create({ data: input });
  }

  async getByShortenedUrl(shortenedUrl: string): Promise<Url> {
    return this.prismaService.url.findFirst({
      where: { shortened_url: shortenedUrl },
    });
  }

  async getAll(): Promise<Url[]> {
    return this.prismaService.url.findMany();
  }

  async update(id: string, input: UpdateUrlDto): Promise<void> {
    await this.prismaService.url.update({
      where: { id: id },
      data: input,
    });
  }

  async delete(id: string): Promise<void> {
    // Only logical delete
    await this.prismaService.url.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });
  }
}

type UrlInput = {
  original_url: string;
  shortened_url: string;
  owner_id?: string;
};
