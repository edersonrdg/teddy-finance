import { UserRepositoryPrismaDB } from '../../../user/user.repository';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../prisma/prisma.service';
import { HashingService } from '../../../hashing';
import { SignInUseCase } from '../sign-in.usecase';
import { JwtModule, JwtService } from '@nestjs/jwt';

describe('Sign-In UseCase', () => {
  const input = {
    email: 'email',
    password: 'password',
  };
  const output = {
    access_token: 'token',
  };
  let signInUseCase: SignInUseCase;
  let userRepository: UserRepositoryPrismaDB;
  let hashingService: HashingService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [],
      providers: [
        PrismaService,
        HashingService,
        UserRepositoryPrismaDB,
        SignInUseCase,
      ],
    }).compile();

    signInUseCase = moduleRef.get<SignInUseCase>(SignInUseCase);
    userRepository = moduleRef.get<UserRepositoryPrismaDB>(
      UserRepositoryPrismaDB,
    );
    hashingService = moduleRef.get<HashingService>(HashingService);
    jwtService = moduleRef.get<JwtService>(JwtService);

    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockImplementation(async () => ({
        id: '1',
        email: 'email',
        password: 'password',
      }));

    jest.spyOn(userRepository, 'create').mockImplementation(async () => ({
      id: '1',
      email: 'email',
      password: 'password',
    }));

    jest
      .spyOn(hashingService, 'comparePassword')
      .mockImplementation(() => true);

    jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => 'token');
  });

  it('should return an success message on sign-in', async () => {
    expect(await signInUseCase.execute(input)).toStrictEqual(output);
  });

  it('should call signAsync method from jwt service', async () => {
    await signInUseCase.execute(input);

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: '1',
      email: 'email',
    });
  });

  it('should call getUserByEmail method from user repository', async () => {
    await signInUseCase.execute(input);

    expect(userRepository.getUserByEmail).toHaveBeenCalledWith(input.email);
  });

  it('should call comparePassword method from hashing service', async () => {
    await signInUseCase.execute(input);

    expect(hashingService.comparePassword).toHaveBeenCalledWith(
      input.password,
      'password',
    );
  });

  it('should throw an error on sign-in if user not found', async () => {
    jest
      .spyOn(userRepository, 'getUserByEmail')
      .mockImplementation(async () => null);

    expect(signInUseCase.execute(input)).rejects.toThrow();
  });

  it('should throw an error on sign-in if password does not match', async () => {
    jest
      .spyOn(hashingService, 'comparePassword')
      .mockImplementation(() => false);

    expect(signInUseCase.execute(input)).rejects.toThrow();
  });
});
