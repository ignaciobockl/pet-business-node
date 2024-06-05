import { Request, Response } from 'express';
import * as userService from '../services/userService.js';
import type { CreateUserDto } from '@/models/types/user.d.ts';
import log from '@/utils/logger.ts';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        'No se puede crear un usuario con el rol de administrador'
    )
      res.status(400).json({ error: error.message });
    else {
      log('error', 'Error creating user', { error });
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
