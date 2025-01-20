import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @ApiProperty({
    example: 'https://google.com',
    required: true,
    type: 'string',
  })
  @IsUrl()
  original_url: string;
}
