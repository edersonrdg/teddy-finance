import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInUseCase } from './usecases/sign-in.usecase';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @Inject()
  private signUpUseCase: SignUpUseCase;

  @Inject()
  private signInUseCase: SignInUseCase;

  @ApiResponse({ status: 200, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Email already used' })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @ApiResponse({ status: 200, description: 'User signed in' })
  @ApiResponse({ status: 400, description: 'Invalid credentials' })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }
}
