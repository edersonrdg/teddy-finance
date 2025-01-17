import { IsFQDN } from 'class-validator';

export class CreateUrlDto {
  @IsFQDN()
  original_url: string;

  owner_id?: string;
}
