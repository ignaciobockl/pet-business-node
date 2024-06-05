import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const router = Router();

router.get('/users', userController.getUsers);
router.post('/user', userController.createUser);

export default router;
