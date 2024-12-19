import express from 'express';
import { register, login, verifyEmail } from '../controllers/authController.js';
import validate from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../utils/validationSchema.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/verify/:token', verifyEmail);

export default router;

