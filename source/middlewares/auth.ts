import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '..';
import { AuthenticatedRequest } from '../../types';

interface IPayload extends jwt.JwtPayload {
  userId: number;
}

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUNTHORIZED));
  }
  try {
    const payload = jwt.verify(token!, JWT_SECRET) as IPayload;
    const user = await prismaClient.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return next(new UnauthorizedException('Usuário não encontrado', ErrorCode.USER_NOT_FOUND));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(new UnauthorizedException('Invalid Token', ErrorCode.UNAUNTHORIZED));
  }
};
export default authMiddleware;
