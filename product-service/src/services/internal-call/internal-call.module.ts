// src/common/http/http.module.ts
import { Global, Module } from '@nestjs/common';
import { InternalCallService } from './internal-call.service';

@Global()
@Module({
  providers: [InternalCallService],
  exports: [InternalCallService],
})
export class InternalCallModule {}
