import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPrismaDB } from 'src/user/user.repository';

@Injectable()
export class SignInUseCase {
  @Inject()
  private userRepository: UserRepositoryPrismaDB;

  @Inject()
  private jwtService: JwtService;

  async execute(signInDto: SignInDto) {
    const user = await this.userRepository.getUserByEmail(signInDto.email);

    if (!user || !bcrypt.compareSync(signInDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
