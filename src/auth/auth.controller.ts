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

  @ApiResponse({
    status: 200,
    description: 'User created',
    example: {
      id: '1234',
      email: 'email@example.com',
      password: '$2b$10$EFoki3GyaFuoITyafqFr8.UirVQFJoQwoHddGUNfBgFRoN7vYR4uG',
      createdAt: '1900-01-01T18:40:09.380Z',
      updatedAt: '1900-01-01T18:40:09.380Z',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already used',
    example: {
      message: 'Email already used',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.signUpUseCase.execute(signUpDto);
  }

  @ApiResponse({
    status: 200,
    description: 'User signed in',
    example: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'User Unauthorized',
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.signInUseCase.execute(signInDto);
  }
}
