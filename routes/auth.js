import express from 'express';
import { infoUser, login, register } from '../controllers/auth.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:email', verifyToken, infoUser);
router.post('/register', register)
router.post('/login', login)

export default router;