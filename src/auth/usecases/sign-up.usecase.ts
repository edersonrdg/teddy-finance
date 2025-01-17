import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from '../dtos/sign-up.dto';
import { UserRepositoryPrismaDB } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpUseCase {
  constructor(private userRepository: UserRepositoryPrismaDB) {}

  async execute(signUpDto: SignUpDto) {
    if (await this.userRepository.getUserByEmail(signUpDto.email)) {
      throw new BadRequestException('Email already used');
    }

    signUpDto.password = bcrypt.hashSync(signUpDto.password, 10);
    return await this.userRepository.create(signUpDto);
  }
}
