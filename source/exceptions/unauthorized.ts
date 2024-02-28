import { ErrorCode, HttpExceptions } from './root';

export class UnauthorizedException extends HttpExceptions {
  constructor(message: string, errorCode: ErrorCode, errors?: any) {
    super(message, errorCode, 401, errors);
  }
}
