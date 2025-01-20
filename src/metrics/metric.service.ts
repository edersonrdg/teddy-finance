import { Injectable } from '@nestjs/common';

import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Injectable()
export class MetricService {
  constructor(
    @InjectMetric('url_redirections_total') public counter: Counter<string>,
  ) {}

  incrementCountMetric() {
    this.counter.inc();
  }
}
