import express from 'express';
import { infoUser, login, register } from '../controllers/auth.js';
import { verifyInfoUser } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:email', verifyInfoUser, infoUser);
router.post('/register', register)
router.post('/login', login)

export default router;