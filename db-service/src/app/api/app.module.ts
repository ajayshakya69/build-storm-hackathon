import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DbModule } from 'src/core/services/db-service/db.module';
import { HealthCheckModule } from 'src/core/health-check/health.module';
import { ReqResInterceptor } from 'src/core/interceptors/response-interceptor';
import { UserModule } from 'src/modules/users/users.module';
import { LoggerModule } from 'src/core/services/logger/logger.module';
import { HttpExceptionFilter } from 'src/core/filters/http-exception.filter';
import { OrganizationModule } from 'src/modules/organization/organization.module';
import { ProductModule } from 'src/modules/products/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    LoggerModule,
    HealthCheckModule,
    // modules
    UserModule,
    OrganizationModule,
    ProductModule,
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
