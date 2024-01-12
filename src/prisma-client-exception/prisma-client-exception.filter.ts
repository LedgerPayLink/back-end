import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { ErrorCodes } from 'src/common/prismaErrorCodes';

// @Catch()
// export class PrismaClientExceptionFilter<T> implements ExceptionFilter {
//   catch(exception: T, host: ArgumentsHost) {
//     console.error(exception.message); // 3
//   }
// }

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    exception.message.replace(/\n/g, '');

    // switch (exception.code) {
    //   case ErrorCodes.enum.uniqueConstraintFailed: {
    //     const status = HttpStatus.CONFLICT;
    //     response.status(status).json({
    //       statusCode: status,
    //       message: message,
    //     });
    //     break;
    //   }
    //   default:
    //     // default 500 error code
    //     super.catch(exception, host);
    //     break;
    // }
    super.catch(exception, host);
  }
}
