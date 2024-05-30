import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.get('/users', userController.getUsers);
router.post('/users', userController.addUser);

export default router;
