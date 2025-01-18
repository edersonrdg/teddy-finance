import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Url } from './entities/url.entity';
import { UpdateUrlDto } from './dto/update-url.dto';

export interface UrlRepository {
  create(input: UrlInput): Promise<Url>;
  getOne(id: string): Promise<Url>;
  getAll(filterInpt: UrlFilterInput): Promise<Url[]>;
  getByShortenedUrl(shortenedUrl: string): Promise<Url>;
  incrementClicks(url: Url): Promise<void>;
  update(id: string, input: UpdateUrlDto): Promise<void>;
  delete(id: string): Promise<void>;
}

@Injectable()
export class UrlRepositoryPrismaDB implements UrlRepository {
  constructor(private prismaService: PrismaService) {}

  async create(input: UrlInput): Promise<Url> {
    return this.prismaService.url.create({ data: input });
  }

  async getOne(id: string): Promise<Url> {
    return this.prismaService.url.findFirst({
      where: { id: id, deleted_at: null },
    });
  }

  async getByShortenedUrl(shortenedUrl: string): Promise<Url> {
    return this.prismaService.url.findFirst({
      where: { shortened_url: shortenedUrl, deleted_at: null },
    });
  }

  async getAll(filterInpt: UrlFilterInput): Promise<Url[]> {
    return this.prismaService.url.findMany({
      where: { ...filterInpt, deleted_at: null },
    });
  }

  async incrementClicks(url: Url): Promise<void> {
    await this.prismaService.url.update({
      where: { id: url.id, deleted_at: null },
      data: { access_count: { increment: 1 }, updated_at: url.updated_at },
    });
  }

  async update(id: string, input: UpdateUrlDto): Promise<void> {
    await this.prismaService.url.update({
      where: { id: id, deleted_at: null },
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

type UrlFilterInput = {
  owner_id?: string;
};

type UrlInput = {
  original_url: string;
  shortened_url: string;
  owner_id?: string;
};
