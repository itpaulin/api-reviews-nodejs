import { NextFunction, Request, Response } from 'express';
import { ErrorCode, HttpExceptions } from './exceptions/root';
import { InternalException } from './exceptions/internal-exception';

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception: HttpExceptions;
      if (err instanceof HttpExceptions) {
        exception = err;
      } else {
        exception = new InternalException('Something went wrong!', err, ErrorCode.INTERNAL_EXCEPTION);
      }
      next(exception);
    }
  };
};
