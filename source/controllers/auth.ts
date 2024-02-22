import { Request, Response } from 'express';
import { prismaClient } from '..';
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';

export const signup = async (req: Request, res: Response) => {
  const { email, name, password, photoUrl } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    throw Error('user already exists.');
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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (!user) {
    throw Error('Does not find user.');
  }

  if (!compareSync(password, user.password)) {
    throw Error('Wrong password');
  }

  const token = jwt.sign(
    {
      userId: user.id
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
// roles "user", "moderator" and "admin",
