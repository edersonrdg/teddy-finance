import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    default: 'email@example.com',
    type: 'string',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 'password',
    required: true,
    type: 'string',
  })
  @MinLength(5)
  password: string;
}
