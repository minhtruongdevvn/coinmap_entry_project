import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MongoError } from 'mongodb';

type MongoErrorName = 'DuplicateKey' | 'WriteConflict';
const MongoErrorCode = new Map<number | string, MongoErrorName>();
MongoErrorCode.set(11000, 'DuplicateKey');
MongoErrorCode.set(112, 'WriteConflict');

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: MongoError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const errorCode = MongoErrorCode.get(exception.code);
    if (!errorCode) {
      console.log(exception);
      httpAdapter.reply(
        ctx.getResponse(),
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      return;
    }

    const response = {
      error: 'DbConstraint',
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode,
    };
    httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
  }
}
