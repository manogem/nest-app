import { Module } from '@nestjs/common';
import {AuthenticationModule} from "./module/authentication/authentication.module";
import {VideoModule} from "./module/video/video.module";
import {ConfigModule} from "./config.module";

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    VideoModule
  ],
})
export class AppModule {}
