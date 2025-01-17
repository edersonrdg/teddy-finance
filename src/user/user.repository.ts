import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

export interface UserRepository {
  create(data: UserInput): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}

@Injectable()
export class UserRepositoryPrismaDB implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: UserInput): Promise<User> {
    return await this.prismaService.user.create({ data });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }
}

type UserInput = {
  email: string;
  password: string;
};
