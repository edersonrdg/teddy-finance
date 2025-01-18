import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @ApiProperty({
    example: 'scgasz',
    required: true,
    type: 'string',
  })
  @MaxLength(6)
  shortened_url: string;
}
