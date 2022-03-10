import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationController } from './ui/web/controller/authentication.controller';
import { AuthenticationService } from './application/service/authentication.service';
import { JwtModule } from '@nestjs/jwt';
import { secret } from '../../constants/secret';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schema/user';
import { isAuthenticated } from './ui/web/middleware/authentication.middleware';
import { VideoController } from '../video/ui/web/controller/video.controller';

@Module({
  imports: [
    JwtModule.register({
      secret,
      signOptions: { expiresIn: '2h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isAuthenticated)
      .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET })
      .forRoutes(VideoController);
  }
}
