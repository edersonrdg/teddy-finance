import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { ConfigService } from '../config/config.service';
import { utilities } from 'nest-winston';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor(private configService: ConfigService) {
    const esTransport = new ElasticsearchTransport({
      level: 'info',
      indexPrefix: 'link-shortener-logs',
      clientOpts: {
        node:
          this.configService.get('ELASTICSEARCH_URL') ||
          'http://localhost:9200',
      },
    });

    const useTransport = [];

    if (this.configService.get('USE_ELASTICSEARCH') === 'true') {
      useTransport.push(esTransport);
    }

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        ...useTransport,
        new winston.transports.Console({
          format: utilities.format.nestLike(),
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info({ message, context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error({ message, trace, context });
  }
}
