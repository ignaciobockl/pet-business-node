import { Router } from 'express';

import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
} from '../controllers/user/userController.ts';

const router = Router();

router.get('/users', getAllUsersController);
router.get('/user/:id', getUserByIdController);
router.post('/user', createUserController);

export default router;
