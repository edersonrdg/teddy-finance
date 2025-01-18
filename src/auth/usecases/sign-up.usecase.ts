import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserRepositoryPrismaDB } from '../../user/user.repository';
import { HashingService } from '../../hashing';

@Injectable()
export class SignUpUseCase {
  constructor(
    private userRepository: UserRepositoryPrismaDB,
    private hashingService: HashingService,
  ) {}

  async execute(signUpDto: SignUpDto) {
    if (await this.userRepository.getUserByEmail(signUpDto.email)) {
      throw new BadRequestException('Email already used');
    }

    signUpDto.password = this.hashingService.hashPassword(signUpDto.password);

    return await this.userRepository.create(signUpDto);
  }
}
