import express from 'express';
import { infoUser, login, register } from '../controllers/auth.js';

const router = express.Router();

router.get('/me', infoUser);
router.post('/register', register)
router.post('/login', login)

export default router;