import { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import type { CreateUserDto } from '@/models/types/user.d.ts';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
): Promise<void> => {
  const user = await userService.createUser(req.body);
  res.json(user);
};
