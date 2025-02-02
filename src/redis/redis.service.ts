import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly client: Redis) {}

  async get(key: string) {
    return this.client.get(key);
  }

  async keys(pattern: string) {
    return this.client.keys(pattern);
  }

  async del(key: string) {
    return this.client.del(key);
  }

  async set(key: string, value: string) {
    return this.client.set(key, value);
  }

  async incr(key: string) {
    return this.client.incr(key);
  }
}
