import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../../models/User/user.ts';

interface Payload extends User {}

const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<unknown, Record<string, unknown>>> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;
    req.user = user;
    next();
    return undefined;
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden' });
  }
};

const generateJWT = (payload: Payload): string =>
  jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<unknown> => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const user = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  return;
};

export { authenticateJWT, generateJWT, requireAuth };
