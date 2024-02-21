import { Request, Response } from 'express';
import { prismaClient } from '..';
import { hashSync } from 'bcrypt';

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
// roles "user", "moderator" and "admin",
