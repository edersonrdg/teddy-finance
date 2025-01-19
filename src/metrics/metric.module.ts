import { Module } from '@nestjs/common';

import {
  makeCounterProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { MetricService } from './metric.service';

@Module({
  imports: [PrometheusModule.register()],
  controllers: [],
  providers: [
    MetricService,
    makeCounterProvider({
      name: 'url_redirections_total',
      help: 'Total de redirecionamentos realizados',
    }),
  ],
  exports: [MetricService, PrometheusModule],
})
export class MetricModule {}
