import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HealthCheckModule } from 'src/core/health-check/health.module';
import { ReqResInterceptor } from 'src/core/interceptors/response-interceptor';
import { LoggerModule } from 'src/core/services/logger/logger.module';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { InternalCallModule } from 'src/services/internal-call/internal-call.module';
import { ProductCategoryModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    HealthCheckModule,
    InternalCallModule,
    ProductCategoryModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ReqResInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
