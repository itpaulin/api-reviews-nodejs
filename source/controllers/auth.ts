import { NextFunction, Request, Response } from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad-request';
import { ErrorCode } from '../exceptions/root';
import { SignUpSchema } from '../schema/users';
import { NotFoundException } from '../exceptions/not-found';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  SignUpSchema.parse(req.body);
  const { email, name, password, photoUrl } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    return next(new BadRequestException('User already exist.', ErrorCode.USER_ALREADY_EXISTS));
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
      role: 'user',
      photo: photoUrl ?? null
    }
  });
  res.json(user);
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw new NotFoundException('Not find user.', ErrorCode.USER_NOT_FOUND);
  } else {
    if (!compareSync(password, user.password)) {
      throw new BadRequestException('Password Wrong.', ErrorCode.INCORRECT_PASSWORD);
    }
  }

  const token = jwt.sign(
    {
      // ! check ! again
      userId: user!.id
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
// * roles "user", "moderator" and "admin",

export const me = async (req: Request, res: Response, next: NextFunction) => {
  res.json(req.user);
};
