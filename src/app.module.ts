import { Module } from '@nestjs/common';
import {AuthenticationModule} from "./module/authentication/authentication.module";
import {ConfigModule} from "./config.module";

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
