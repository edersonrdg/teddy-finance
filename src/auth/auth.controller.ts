import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInUseCase } from './usecases/sign-in.usecase';

@Controller('auth')
export class AuthController {
  @Inject()
  private signUpUseCase: SignUpUseCase;

  @Inject()
  private signInUseCase: SignInUseCase;

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }
}
