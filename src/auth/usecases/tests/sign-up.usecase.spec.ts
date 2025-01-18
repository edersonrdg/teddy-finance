// import { PrismaService } from '../../../prisma/prisma.service';
import { SignUpUseCase } from '../sign-up.usecase';
import { UserRepositoryPrismaDB } from '../../../user/user.repository';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { HashingService } from '../../../hashing';

describe('Sign-Up UseCase', () => {
  const input = {
    email: 'email',
    password: 'password',
  };
  const output = {
    id: '1',
    email: 'email',
    password: 'password',
  };
  let signUpUseCase: SignUpUseCase;
  let userRepository: UserRepositoryPrismaDB;
  let hashingService: HashingService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        PrismaService,
        HashingService,
        UserRepositoryPrismaDB,
        SignUpUseCase,
      ],
    }).compile();

    signUpUseCase = moduleRef.get<SignUpUseCase>(SignUpUseCase);
    userRepository = moduleRef.get<UserRepositoryPrismaDB>(
      UserRepositoryPrismaDB,
    );
    hashingService = moduleRef.get<HashingService>(HashingService);

    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockImplementation(async () => null);

    jest.spyOn(userRepository, 'create').mockImplementation(async () => output);

    jest
      .spyOn(hashingService, 'hashPassword')
      .mockImplementation((password: string) => password);
  });

  it('should return an success message on sign-up', async () => {
    expect(await signUpUseCase.execute(input)).toBe(output);
  });

  it('should call user repository to create user', async () => {
    await signUpUseCase.execute(input);

    expect(userRepository.create).toHaveBeenCalledWith(input);
  });

  it('should call hashing service to hash password', async () => {
    await signUpUseCase.execute(input);

    expect(hashingService.hashPassword).toHaveBeenCalledWith(input.password);
  });

  it('should call user repository to get user by email', async () => {
    await signUpUseCase.execute(input);

    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(input.email);
  });

  it('should throw an error on sign-up if email already exists', async () => {
    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockImplementation(async () => output);

    expect(signUpUseCase.execute(input)).rejects.toThrow();
  });
});
