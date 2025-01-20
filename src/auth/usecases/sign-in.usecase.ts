import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryPrismaDB } from '../../user/user.repository';
import { HashingService } from '../../hashing';
import { LoggerService } from '../../Logger/logger.service';

@Injectable()
export class SignInUseCase {
  constructor(
    private userRepository: UserRepositoryPrismaDB,
    private jwtService: JwtService,
    private hashingService: HashingService,
    private logger: LoggerService,
  ) {}

  async execute(signInDto: SignInDto) {
    this.logger.log('[SIGN IN] User trying to sign in');
    const user = await this.userRepository.getUserByEmail(signInDto.email);

    if (
      !user ||
      !this.hashingService.comparePassword(signInDto.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
