// src/modules/api/v1/restful/routes/user.routes.js
import { Router } from 'express';
const router = Router();
import { getUser, createUser } from '../controllers/user.controller';
import { getUserSchema, createUserSchema } from '../validators/user.validator';
import { authenticate } from '../middlewares/auth.middleware';

router.get('/:id', authenticate, getUserSchema, getUser);
router.post('/', createUserSchema, createUser);

export default router;