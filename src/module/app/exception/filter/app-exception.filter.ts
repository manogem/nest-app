import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserEmailAlreadyExistsException } from "../../../authentication/domain/exception/user-email-already-exists.exception";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        let httpStatus;
        let message;

        if (exception instanceof HttpException) {
            httpStatus = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof UserEmailAlreadyExistsException) {
            httpStatus = HttpStatus.CONFLICT;
            message = exception.message;
        } else {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            // @ts-ignore
            message = process.env.NODE_ENV === 'dev' ? exception.message : 'Please try again later'
        }

        const responseBody = {
            status: httpStatus,
            message: message,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

