import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    if (fs.existsSync(filePath)) {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } else {
      this.envConfig = {}
    }
  }

  get(key: string): string {
    return this.envConfig[key] ?? process.env[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
