import { Injectable } from '@nestjs/common';
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus';

@Injectable()
export class CustomHealthService extends HealthIndicator {
  constructor() {
    super();
  }
}
