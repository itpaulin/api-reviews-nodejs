import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { prismaClient } from '..';
import { User } from '@prisma/client';

interface IPayload extends jwt.JwtPayload {
  userId: number;
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUNTHORIZED));
  }
  try {
    const payload = jwt.verify(token!, JWT_SECRET) as IPayload;
    const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
    if (user) {
      req.user = user;
    }
    next();
  } catch (err) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUNTHORIZED));
  }
};
export default authMiddleware;
