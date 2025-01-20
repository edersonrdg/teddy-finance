import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://google.com',
    required: true,
    type: 'string',
  })
  @IsUrl()
  original_url: string;

  shortened_url?: string;
}
