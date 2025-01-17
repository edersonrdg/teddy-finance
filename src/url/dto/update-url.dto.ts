import { PartialType } from '@nestjs/mapped-types';
import { CreateUrlDto } from './create-url.dto';
import { MaxLength } from 'class-validator';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
  @MaxLength(6)
  shortened_url: string;
}
