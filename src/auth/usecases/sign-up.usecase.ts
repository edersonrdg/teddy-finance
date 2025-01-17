import { Injectable } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class SignUpUseCase {
  constructor() {}

  execute(signUpDto: SignUpDto) {
    return 'signUp';
  }
}
