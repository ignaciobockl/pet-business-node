import { Router } from 'express';

import {
  createUserController,
  getAllUsersController,
} from '../controllers/user/userController.ts';

const router = Router();

router.get('/users', getAllUsersController);
router.post('/user', createUserController);

export default router;
