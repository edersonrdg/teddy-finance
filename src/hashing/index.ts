import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { constants } from '../config/constants';

@Injectable()
export class HashingService {
  hashPassword(password: string): string {
    return bcrypt.hashSync(password, constants.DEFAULT_SALT_ROUNDS);
  }

  comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
