import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInUseCase } from './usecases/sign-in.usecase';
import { UserRepositoryPrismaDB } from 'src/user/user.repository';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [UserRepositoryPrismaDB, SignUpUseCase, SignInUseCase],
})
export class AuthModule {}
