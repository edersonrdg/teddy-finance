export class Url {
  id: string;
  original_url: string;
  shortened_url?: string;
  access_count: number;
  deleted_at?: Date;
  owner_id?: string;
  updated_at: Date;
  created_at: Date;
}
