import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class SignInUseCase {
  constructor() {}

  execute(signInDto: SignInDto) {
    return 'signIn';
  }
}
