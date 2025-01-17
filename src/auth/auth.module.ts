import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInUseCase } from './usecases/sign-in.usecase';

@Module({
  controllers: [AuthController],
  providers: [SignUpUseCase, SignInUseCase],
})
export class AuthModule {}
