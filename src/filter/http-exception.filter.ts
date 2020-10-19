import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

/**
 * Customize lại response của ExceptionFilter
 */

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor() {}

  private static handleResonse(
    response: Response,
    exception: HttpException | QueryFailedError | Error,
  ): void {
    let responseBody: any = { message: 'Internal sever error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        message: exception.stack,
      };
    }

    response.status(statusCode).json(responseBody);
  }

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    AllExceptionFilter.handleResonse(response, exception);
  }
}
