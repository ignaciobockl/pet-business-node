import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { User } from '../../models/User/user.ts';

interface Payload extends User {}

/**
 * Middleware to authenticate JWT.
 * Verifies the JWT token in the Authorization header and assigns the decoded user to req.user.
 * If the token is valid, calls next(); if not, returns an authorization error.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 * @returns Promise resolving to void or Response, or undefined if token is valid.
 */
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

/**
 * Generates a JWT token using the provided user data.
 * @param payload - User data to include in the JWT token.
 * @returns Signed JWT token.
 */
const generateJWT = (payload: Payload): string =>
  jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });

/**
 * Middleware to require JWT authentication on protected routes.
 * Verifies the JWT token in the Authorization header and assigns the decoded user to req.user.
 * If the token is valid, calls next(); if not, returns an authorization error.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Next middleware function.
 * @returns void or Response if token is invalid.
 */
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
