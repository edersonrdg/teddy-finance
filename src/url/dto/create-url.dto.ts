import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  original_url: string;

  shortened_url?: string;
}
