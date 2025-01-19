import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UserRepositoryPrismaDB } from '../user/user.repository';
import { SignUpUseCase } from './usecases/sign-up.usecase';
import { SignInUseCase } from './usecases/sign-in.usecase';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { HashingService } from '../hashing';
import { LoggerModule } from '../Logger/logger.module';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, LoggerModule, JwtModule.register({})],
      controllers: [AuthController],
      providers: [
        HashingService,
        UserRepositoryPrismaDB,
        SignUpUseCase,
        SignInUseCase,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
