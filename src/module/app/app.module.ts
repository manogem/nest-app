import { Module } from '@nestjs/common';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ConfigModule } from './config.module';
import { UserModule } from '../user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AppExceptionFilter } from './exception/filter/app-exception.filter';

@Module({
  imports: [ConfigModule, AuthenticationModule, UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
