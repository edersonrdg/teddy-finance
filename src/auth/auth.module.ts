import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInUseCase } from './usecases/sign-in.usecase';
import { UserRepositoryPrismaDB } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserRepositoryPrismaDB, SignUpUseCase, SignInUseCase],
})
export class AuthModule {}
