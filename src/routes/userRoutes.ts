import { Router } from 'express';
import * as userController from '../controllers/userController.ts';

const router = Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

export default router;
