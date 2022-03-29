import {Module } from '@nestjs/common';
import {AuthenticationModule} from "./module/authentication/authentication.module";
import {ConfigModule} from "./config.module";
import {UserModule} from "./module/user/user.module";

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    UserModule,
  ],
})
export class AppModule {}
